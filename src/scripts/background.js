import {badge, notifier, csSender, environment, word} from "../libs/bg";
import {reciever} from "../libs/cm";
import "./init";


const config = {
    storageCacheRefresh: 30
};

let cache = {
    alertNum: 0,
    alertContent: []
};

let clock = {
    alert: (message) => {
        notifier.basic({
            title: `reminder`,
            message
        });
        cache.alertContent.push({
            ts: Date.now(),
            content: message
        });
        badge.setText(++cache.alertNum, "red");
    }
};

class CountDown {
    constructor() {
        this.cache = [];
        this.init();
    }

    init() {
        setInterval(() => {
            this.cache.forEach((each) => {
                if (--each.countdown <= 0) {
                    this.alert(each.content);
                }
            });
            this.cache = this.cache.filter(e => e.countdown > 0);
        }, 1000);
    }

    alert(content) {
        clock.alert(content);
    }

    push(countdown, content) {
        this.cache.push({
            countdown: countdown,
            content, content
        });
    }

    get() {
        return this.cache;
    }
}

let countdown = new CountDown();

let wordCache = {
    key: null,
    value: null,
    setKey (key) {
        this.key = key
        this.check()
    },
    setValue (value) {
        this.value = value
        this.check()
    },
    check () {
        if (this.key && this.value) {
            let [key, value] = [this.key, this.value]
            word.put({key, value})
                .then(res => {
                    console.log(res)
                }, err => {
                    console.log(err)
                })
            this.key = null
            this.value = null
        }
    }
}

reciever
    .on("countdown.set", ({content, timeout}) => {
        countdown.push(+timeout, content);
        return true;
    })
    .on("countdown.get", () => {
        return countdown.get();
    })
    .on("cache.getBadge", () => {
        return cache.alertContent;
    })
    .on("cache.clearBadge", () => {
        cache.alertNum = 0;
        cache.alertContent = [];
        badge.clear();
        return true;
    })
    .on("environment.getState", () => {
        environment.getState()
            .then(state => {
                csSender.send(`environment.snowSwitch`, state.snow.isOn);
                csSender.send(`environment.snowParam`, state.snow);
                csSender.send(`environment.filter`, state.filter);
            })
    })
    .on("word.key", (key) => {
        wordCache.setKey(key)
    })
    .on("word.value", (value) => {
        wordCache.setValue(value)
    })