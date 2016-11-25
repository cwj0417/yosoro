import {Message, badge, storage, notifier} from '../libs';


let sender = Message.sender;
let reciever = Message.reciever;


const config = {
    storageCacheRefresh: 30
};

let cache = {
    alertNum: 0,
    alertContent: []
};

let clock = {
    alert: (content) => {
        notifier.pop(content);
        cache.alertContent.push({
            ts: Date.now(),
            content: content
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

class StorageCache {
    constructor() {
        this.fetch();
        setInterval(this.fetch, config.storageCacheRefresh * 1000);
    }

    fetch() {
        storage.getAll()
            .then((list) => {
                this.cache = list;
            })
    }

    set(key, value) {
        this.cache[key] = value;
        storage.set(key, value);
    }

    get(key) {
        return this.cache[key];
    }

    sRem(set, key) {
        let result = this.get(set);
        (key in result) && delete result[key];
        return this.set(set, result);
    }

    sAdd(set, key, content) {
        let result = this.get(set);
        result = result || {};
        result[key] = content;
        this.set(set, result);
    }
}
let countdown = new CountDown();
let storagecache = new StorageCache();

reciever
    .on("modules.get", () => {
        return storagecache.get("modules");
    })
    .on("modules.set", (list) => {
        return storagecache.set("modules", list);
    })
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
    .on("todo.add", (content) => {
        let cur = storagecache.get("todoList") || [];
        cur.push({
            ts: Date.now(),
            content: content
        });
        return storagecache.set("todoList", cur);
    })
    .on("todo.get", () => {
        return storagecache.get("todoList");
    })
    .on("todo.set", (value) => {
        return storagecache.set("todoList", value);
    })