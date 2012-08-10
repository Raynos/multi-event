var MuxDemuxClient = require("mux-demux-net")
    , MultiEvent = require("../..")

var mdm = MuxDemuxClient(8642)
    , mee = MultiEvent(mdm)

var emitter = mee.createEmitter("winning")
emitter.on("anything", console.log.bind(console, "[CLIENT]"))
emitter.emit("some-event", "hello!")