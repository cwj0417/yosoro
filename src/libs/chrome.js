class sender {
    send(event, data = null) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({request: event, data: data}, function (response) {
                resolve(response);
            });
        });
    }
}
class reciever {
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

export let notifier = {
    pop: (content, title = "友情提示", ico = "../imgs/ruby_q.png") => {
        chrome.notifications.create({
            type: "basic",
            iconUrl: ico,
            title: title,
            message: content
        }, (cb) => {
            //
        });
    }
};
export let badge = {
    setColor(color) {
        chrome.browserAction.setBadgeBackgroundColor({color: color});
    },
    setText(text, color) {
        chrome.browserAction.setBadgeText({text: text.toString()});
        if (color)
            this.setColor(color);
    },
    clear() {
        chrome.browserAction.setBadgeText({text: ""});
    }
};

export let storage = {
    set(key, value) {
        let obj = {};
        obj[key] = value;
        return new Promise((resolve) => {
            chrome.storage.sync.set(obj, (callback) => {
                resolve(`ok${callback}`);
            })
        });
    },
    get(key) {
        return new Promise((resolve) => {
            chrome.storage.sync.get(key, (callback) => {
                resolve(callback[key]);
            });
        });
    },
    getAll() {
        return new Promise((resolve) => {
            chrome.storage.sync.get((callback) => {
                resolve(callback);
            });
        })
    },
    sAdd(set, key, value) {
        return this.get(set)
            .then((result) => {
                result = result || {};
                result[key] = value;
                return this.set(set, result);
            });
    },
    sGet(set, key) {
        return this.get(set)
            .then((result) => {
                return (result && result[key]) ? Promise.resolve(result[key]) : Promise.reject("set not found");
            });
    },
    sRem(set, key) {
        return this.get(set)
            .then((result) => {
                if (result && result[key]) {
                    delete result[key];
                    return this.set(set, result);
                } else {
                    return Promise.reject("set not found");
                }
            });
    },
    remove(key) {
        return new Promise((resolve) => {
            chrome.storage.sync.remove(key, (callback) => {
                resolve(callback);
            })
        });
    }
};


export let Message = {
    get sender() {
        return new sender();
    },
    get reciever() {
        return new reciever();
    }
};