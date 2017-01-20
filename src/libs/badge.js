export const badge = {
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
}