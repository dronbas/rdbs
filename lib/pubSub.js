const Redis = require('ioredis')
const uuidV4  = require('uuid/v4')
const Base = require('./base')

class PubSub extends Base {

  constructor (config) {
    super()
    this.sub = new Redis(config)
    this.pub = new Redis(config)
    this.subsMap = new Map()
    this.sub.on('message', (channel, msg) => this.handleMsg(channel, msg))
    this.sub.on('connect', () => this.handleMsg('connect'))
    this.sub.on('error', err => this.handleMsg('error', err))
  }

  on (channel, cb) {
    const uuid = uuidV4()
    let cbMap
    if (this.subsMap.has(channel)) {
      cbMap = this.subsMap.get(channel)
    } else {
      cbMap = new Map()
      this.subsMap.set(channel, cbMap)
      this.sub.subscribe(channel)
    }
    cbMap.set(uuid, cb)
  }

  handleMsg (channel, msg) {
    if (!this.subsMap.has(channel)) {
      return
    }
    const callbackMap = this.subsMap.get(channel)
    msg = this.parseMsg(msg)
    callbackMap.forEach(cb => cb(msg))
  }
}

module.exports = PubSub
