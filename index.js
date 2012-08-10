var through = require("through")
    , RemoveEventEmitter = require("remote-events")
    , proxyStream = require("./lib/proxyStream")

module.exports = MultiEvent

function MultiEvent(input) {
    if (typeof input === "function") {
        return MultiEventServer(input)
    }
    return MultiEventClient(input)
}

function MultiEventClient(mdm) {
    var stream = through()

    stream.pipe(mdm).pipe(stream)

    mdm.on("error", reemit)

    stream.createEmitter = createEmitter

    return stream

    function reemit(err) {
        stream.emit("error", err)
    }

    function createEmitter(meta) {
        var stream = mdm.createStream(meta)
            , ee = createEventEmitter(stream)

        return ee
    }
}

function MultiEventServer(handler) {
    return streamHandler

    function streamHandler(stream) {
        var ee = createEventEmitter(stream)
        ee.meta = stream.meta
        handler(ee)
    }
}

function createEventEmitter(stream) {
    var ree = new RemoveEventEmitter
        , eventStream = ree.getStream()

    stream.pipe(eventStream).pipe(stream)

    proxyStream(stream, ree)

    return ree
}