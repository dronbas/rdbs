'use strict';
const Redis = require('ioredis');
const uuidV4 = require('uuid/v4');
const PubSub = require("./pubSub");

class RequestReply extends PubSub {
    
  constructor(config) {
    super();
    this.reqRepMap = new Map();
    this.reqRep = new Redis(config);
    this.reqRep.on('message', (channel, msg) => this.handleReply(channel, msg));
  }
  
  _createMessage (data, uuid) {
    return {
      uuid: uuid,
      data: data
    };
  }

  handleReply (channel, msg) {
    if (!this.reqRepMap.has(channel)) {
      return;
    }
    let callbackMap = this.reqRepMap.get(channel);
    this.reqRepMap.delete(channel);
    return callbackMap.resolve(this.parseMsg(msg));
  }
  
  req (channel, msg) {
    return new Promise((resolve, reject) => {
      const uuid = uuidV4();
      this.reqRepMap.set(channel + uuid, {resolve: resolve, reject: reject});
      this.reqRep.subscribe(channel + uuid, () => {
        super.emit(channel, this._createMessage(msg, uuid));
      });
    });
  }
  
  on (channel, callbackFunc) {
    super.on(channel, (msg) => {
      callbackFunc(msg.data, data => {
        super.emit(channel + msg.uuid, data);
      });
    });
  }
}

module.exports = RequestReply;