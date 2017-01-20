class _reciever {
    constructor() {
        this.events = {};
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            message.request && this.events[message.request] && sendResponse(this.events[message.request](message.data));
        });
    }

    on(event, fn) {
        this.events[event] = fn;
        return this;
    }
}

export const reciever = new _reciever();