import moment from "moment"
export const getBytes = function (target) {
    return JSON.stringify(target).replace(/[^\u0000-\u00ff]/g,"aaa").length
}
export const dateFormat = function (timestamp, format = "YYYY-MM-DD HH:mm:ss") {
    return timestamp ? moment(timestamp).format(format) : ""
}
export const merge = {
    needed () {

    },
    exec () {

    }
}