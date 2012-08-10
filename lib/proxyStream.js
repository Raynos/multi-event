var methods = ["write", "end", "destroy", "pause", "resume"]
    , events = ["data", "end", "close", "drain", "error"]
    , slice = Array.prototype.slice

module.exports = proxyStream

function proxyStream(source, target) {
    methods.forEach(copyMethods)
    events.forEach(forwardEvents)

    function copyMethods(methodName) {
        var method = source[methodName]
        if (method) {
            target[methodName] = method.bind(source)
        }
    }

    function forwardEvents(eventName) {
        source.on(eventName, forward)

        function forward(data) {
            var args = slice.call(arguments)
            args.unshift(eventName)
            target.localEmit.apply(target, args)
        }
    }
}