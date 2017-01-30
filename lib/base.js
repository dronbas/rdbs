class Base {

  parseMsg (msg = {}) {
    return JSON.parse(msg)
  }

  emit (topic, message = {}) {
    this.pub.publish(topic, JSON.stringify(message))
  }
}

module.exports = Base
