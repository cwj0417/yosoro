import {menu, dict, notifier, extract, tabs} from '../libs';


let translate = function ({selectionText}) {
    dict.search(selectionText)
        .then((results) => {
            notifier.basic({
                iconUrl: "../imgs/yohane_q.png",
                title: selectionText,
                message: results.join("\n")
            });
        });
};

let putExtract = function({selectionText, pageUrl}) {
    fetch(pageUrl)
        .then(res => res.blob())
        .then(blob => {
            let fr = new FileReader();
            fr.onload = function() {
                let reg = /<title>(.*)<\/title>/;
                let title = fr.result.match(reg)[1];
                extract.put(pageUrl, title, selectionText);
            };
            fr.readAsText(blob);
        });
};

let collect = function() {
    tabs.stGet()
        .then(state => {
            tabs.getCurWindow()
                .then(cur => {
                    let hash = Date.now();
                    state[hash] = {
                        name: `新建收纳${new Date().toLocaleString()}`,
                        tabs: cur
                    };
                    tabs.stSet(state);
                })
        })
};

menu.removeAll();

menu.create({
    type: "normal",
    title: "翻译",
    contexts: ["selection"],
    onclick: translate
});
menu.create({
   type: "normal",
    title: "摘录",
    contexts: ["selection"],
    onclick: putExtract
});
menu.create({
   type: "normal",
    title: "收集tab",
    contexts: ["all"],
    onclick: collect
});