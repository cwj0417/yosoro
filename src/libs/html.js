export const selection = {
    get () {
        return getSelection().toString()
    },
    exec (action) {
        return () => {
            action && action(this.get())
        }
    }
}

export const keyPress = function (key, action) {
    const validKey = function (event, {key, alt = false, ctrl = false}) {
        if (event.key == "Control" || event.key == "Alt") {
            return false
        }
        let [keyName, isAlt, isCtrl] = [String.fromCharCode(event.keyCode), event.ctrlKey, event.altKey]
        if (keyName === key.toUpperCase() && (alt === isAlt || ctrl === isCtrl)) {
            return true
        }
        return false
    }
    return function (event) {
        if (validKey(event, key)) {
            action && action()
        }
    }
}