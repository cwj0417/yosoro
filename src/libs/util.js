import moment from "moment"

function sizeof (str) {
    let total = 0
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i)
        if (charCode <= 0x007f) {
            total += 1
        } else if (charCode <= 0x07ff) {
            total += 2
        } else if (charCode <= 0xffff) {
            total += 3
        } else {
            total += 4
        }
    }
    return total
}

export const getBytes = function (target) {
    return sizeof(JSON.stringify(target))
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
