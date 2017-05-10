import {snowFall, keyPress, selection} from "../libs/cs"
import {reciever, sender, Message} from "../libs/cm"
import config from "../config"


// environment
const snow = new snowFall()

snow.start()

reciever
    .on(`environment.snowSwitch`, function (isOn) {
        if (isOn) {
            snow.createFlakes()
        } else {
            snow.clearFlakes()
        }
    })
    .on(`environment.snowParam`, function ({Snow3num = config.snow.Snow3num, Snow3Size = config.snow.Snow3Size, Snow3Speed = config.snow.Snow3Speed} = {}) {
        snow.Snow3num = Snow3num
        snow.Snow3Size = Snow3Size
        snow.Snow3Speed = Snow3Speed
        snow.resetFlakes()
    })
    .on(`environment.filter`, function (params) {
        let filterStyle = ``
        for (let [key, value] of Object.entries(config.filter)) {
            filterStyle += `${key}(${value.min + (value.max - value.min) * +params[key] / 100}${value.unit})`
        }
        document.getElementsByTagName('html')[0].style.filter = filterStyle
    })

sender.send(`environment.getState`)

// words
let sendWord = function (key) {
    let sendDispatch = {
        key (selection) {
            sender.send(`word.key`, selection)
                .then(() => {
                    Message.show("设置单词...")
                })
        },
        value (selection) {
            sender.send(`word.value`, selection)
                .then(() => {
                    Message.show("设置解释...")
                })
        }
    }
    return sendDispatch[key]
}

let bindedKey = keyPress({key: "b", ctrl: true, alt: true}, selection.exec(sendWord("key")))

let bindedValue = keyPress({key: "j", ctrl: true, alt: true}, selection.exec(sendWord("value")))

document.addEventListener("keyup", bindedKey)

document.addEventListener("keyup", bindedValue)

