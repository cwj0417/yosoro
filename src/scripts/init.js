import {menu, dict, notifier} from '../libs';


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

menu.create({
    type: "normal",
    title: "翻译 '%s'",
    contexts: ["selection"],
    onclick: translate
});