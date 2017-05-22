export const getBytes = function (target) {
    return JSON.stringify(target).replace(/[^\u0000-\u00ff]/g,"aaa").length
}