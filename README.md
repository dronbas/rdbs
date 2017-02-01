# Rdbs

Rdbs is a robust redis pub/sub wrapper and redis request/reply es6 implementation

## Quick Start

### Install
```shell
npm i -S rdbs
```
### Basic Usage

#### initiate the Rdbs instance
```javascript
const Rdbs = require('rdbs')
```
#### Config
Use [ioredis](https://github.com/luin/ioredis "ioredis") configuration

```javascript
const redisConfig = {
  port: 6379, // default
  host: '127.0.0.1', // default
  password: 'auth',
  db: 0 // default
}
```
## Redis client
```javascript
const ioredis = Rdbs.createRedis(redisConfig)
```
## Pub/Sub
Here is a simple example of the API for publish/subscribe.
The following program opens two client connections.
It subscribes to a channel with one connection
and publishes to that channel with the other under the hood:

```javascript
const Rdbs = require('rdbs')
const pubSub = Rdbs.createPubSub(redisConfig)

pubSub.on('foo', message => {
  console.log('first listener catch foo -> %s', message)
})

pubSub.on('foo', message => {
  console.log('second listener catch foo -> %s', message)
})

pubSub.emit('foo', 'bar')

// first listener catched foo -> bar
// second listener catched foo -> bar

```
Also you can send an object (command pattern)

```javascript
const pubSub = rdbs.createPubSub(redisConfig);

pubSub.on('conect', () => {
  // handle connection
})

pubSub.on('error', error => {
  // handle error
})

pubSub.on('foo', data => {
  console.log('catch foo', data);
});

pubSub.emit('foo', {bar:'bar'});

// catched foo { bar: 'bar' }
```
## Req/Rep
If you want to get response from another app, you have to use req/rep pattern

```javascript

const reqRep = Rdbs.createReqRep(redisConfig);

reqRep.on('conect', () => {
  // handle connection
})

reqRep.on('error', error => {
  // handle error
})

reqRep.on('req', (data, cb) => {
  console.log('catch request', data);
  //simulate async data processing
  setTimeout(() => cb({ response: 'response' }), 2000);
});

reqRep.req('req', { request: 'request' })
  .then(response => {
    console.log('reply is', response);
  }).catch((err) => {
    // you own error handler
  });

// catch request { request: 'request' }
// reply is { response: 'response' }
```

# Join in!

If you want to join this case by help maintaining something, please don't hesitate to contact.

I'm happy to receive bug reports, fixes, documentation enhancements, and any other improvements.

And since I'm not a native English speaker, if you find any grammar mistakes in the documentation, please also let me know. :)