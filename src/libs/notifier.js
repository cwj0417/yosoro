export const notifier = {
    basic({
        iconUrl = `../imgs/ruby_q.png`,
        title = `NOTICE`,
        message = `something goes wrong`,
        priority = 1,
        buttons = []
    } = {}, cb = null) {
        chrome.notifications.create({
            type: `basic`,
            title,
            message,
            iconUrl,
            priority,
            buttons
        })
    },
    list({
        iconUrl = `../imgs/ruby_q.png`,
        priority = 1,
        buttons = [],
        items = []
    } = {}, cb = null) {
        chrome.notifications.create({
            type: `list`,
            iconUrl,
            priority,
            buttons,
            items
        })
    },
    progress({
        iconUrl = `../imgs/ruby_q.png`,
        title = `NOTICE`,
        message = `something goes wrong`,
        priority = 1,
        buttons = []
    } = {}, cb = null) {
        //这个需要用的时候要大改..
        chrome.notifications.create({
            type: `progress`,
            title,
            message,
            iconUrl,
            priority,
            buttons,
            progress: 30
        })
    }
};