export let dict = {
    async search(word) {
        let url = `http://fanyi.youdao.com/openapi.do?keyfrom=chromeextensions&key=1428418062&type=data&doctype=json&version=1.1&q=${word}`;
        let res = await fetch(url)
            .then(res => res.json())
            .then((json) => {
                return this.getResult(json);
            })
            .catch((e) => {
                throw "dict fetch result error";
            });
        return res;
    },
    getResult(res) {
        if (res.errorCode === 0) {
            return res.basic ? res.basic.explains : res.translation;
        } else {
            console.log(res);
            return "something was wrong of dict api";
        }
    }
};