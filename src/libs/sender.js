class _sender {
    send(event, data = null) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({request: event, data: data}, function (response) {
                resolve(response);
            });
        });
    }
}

export const sender = new _sender();
