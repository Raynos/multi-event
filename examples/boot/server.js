var browserifyServer = require("browserify-server")
    , http = require("http")
    , path = require("path")
    , boot = require("boot")
    , MultiEvent = require("../..")

var handler = browserifyServer(path.join(__dirname, "static"))
    , server = http.createServer(handler).listen(8080)
    , mee = MultiEvent(eventHandler)
    , sock = boot(mee)

sock.install(server, "/boot")

function eventHandler(emitter) {
    emitter.on("data", function (data) {
        console.log("data?", data)
    })
    emitter.on("some-event", console.log.bind(console, "[SERVER]"))
    emitter.emit("anything", "just works")
}