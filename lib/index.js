const PubSub = require('./pubSub')
const ReqRep = require('./reqRep')

function factory (config, Instance) {
  return new Instance(config)
}

class Rdbs {
  constructor (config = {}) {
    this.config = this.checkConfig(config)
  }

  pubSub () {
    return factory(this.config, PubSub)
  }

  reqRep () {
    return factory(this.config, ReqRep)
  }

  checkConfig (config) {
    if (!config.port) {
      config.port = 6379
    }

    if (!config.host) {
      config.host = 'localhost'
    }

    return config
  }

}

module.exports = Rdbs
