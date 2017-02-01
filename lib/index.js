const PubSub = require('./pubSub')
const ReqRep = require('./reqRep')
const Redis = require('ioredis')

function factory (cfg , Instance) {
  return new Instance(cfg)
}

module.exports = {
  createRedis (cfg) {
    return factory(cfg, Redis)
  },

  createPubSub (cfg) {
    return factory(cfg, PubSub)
  },

  createReqRep (cfg) {
    return factory(cfg, ReqRep)
  }
}
