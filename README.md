# multi-event [![build status][1]][2]

create named event emitter servers with mux-demux

Similar to mux-demux except the "server" get's event emitters with meta data and the client can open event emitters to the server

## Example Client

``` js
var MuxDemuxClient = require("mux-demux-net")
    , MultiEvent = require("../..")

var mdm = MuxDemuxClient(8642)
    , mee = MultiEvent(mdm)

var emitter = mee.createEmitter("winning")
emitter.on("anything", console.log.bind(console, "[CLIENT]"))
emitter.emit("some-event", "hello!")
```

## Example Server

``` js
var MuxDemuxServer = require("mux-demux-net")
    , MultiEvent = require("../..")

var mee = MultiEvent(handleEmitter)

MuxDemuxServer(mee, 8642)

function handleEmitter(emitter) {
    emitter.on("some-event", console.log.bind(console, "[SERVER]"))
    emitter.emit("anything", "just works")
}
```

## Installation

`npm install multi-event`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/multi-event.png
  [2]: http://travis-ci.org/Raynos/multi-event