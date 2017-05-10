import "../styles/message.scss"
export const Message = {
    messages: [],
    instance: document.createElement('div'),
    txtWrap: document.createElement('div'),
    txtSpan: document.createElement('span'),
    duration: null,
    isActive: false,
    init () {
        this.instance.className = 'yosoro-message'
        this.txtWrap.className = 'yosoro-message-txt-wrap'
        this.txtWrap.appendChild(this.txtSpan)
        this.instance.appendChild(this.txtWrap)
    },
    clean () {
        let cleanArr = (a, b) => {
            if (a[a.length - 1] !== b) {
                a.push(b)
            }
            return a
        }
        this.messages = this.messages.reduce(cleanArr, [this.messages[0]])
    },
    createMessage () {
        document.body.appendChild(this.instance)
        this.isActive = true
        this.setTxt()
    },
    setTxt () {
        this.txtSpan.innerText = this.messages[0]
    },
    removeMessage () {
        this.instance && this.instance.remove()
        this.isActive = false
    },
    updateView () {
        if (this.messages.length) {
            if (this.isActive) {
                this.clean()
                this.setTxt()
            } else {
                this.createMessage()
            }
            setTimeout(this.nextTick.bind(this), this.duration)
        } else {
            this.removeMessage()
        }
    },
    nextTick () {
        this.messages.shift()
        this.updateView()
    },
    show (content, duration = 2500, bg = "#00") {
        this.duration = duration
        content = content.toString()
        if (content.length) {
            this.messages.push(content)
            if (!this.isActive) {
                this.updateView()
            }
        }
    }
}
Message.init()