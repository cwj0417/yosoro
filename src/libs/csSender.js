class _csSender {
    send(event, data = null) {
        return new Promise((resolve) => {
            chrome.tabs.query({}, function (tabs) {
                for(let {id} of tabs) {
                    chrome.tabs.sendMessage(id, {request: event, data: data}, function(response) {
                        resolve(response);
                    })
                }
            });
        });
    }
}

export const csSender = new _csSender();