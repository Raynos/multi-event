var MuxDemuxServer = require("mux-demux-net")
    , MultiEvent = require("../..")

var mee = MultiEvent(handleEmitter)

MuxDemuxServer(mee, 8642)

function handleEmitter(emitter) {
    emitter.on("some-event", console.log.bind(console, "[SERVER]"))
    emitter.emit("anything", "just works")
}