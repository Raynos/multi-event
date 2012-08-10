var boot = require('boot')
    , MultiEvent = require("../..")

var mdm = boot("/boot")
    , mee = MultiEvent(mdm)

var emitter = mee.createEmitter("winning")
emitter.on("data", function (data) {
    console.log("data?", data)
})
emitter.on("anything", console.log.bind(console, "[CLIENT]"))
setTimeout(function () {
    console.log("emitting")
    emitter.emit("some-event", "hello!")
    console.dir(emitter)
}, 600)