import {snowFall} from "../libs/cs";
import {reciever, sender} from "../libs/cm";
import config from "../config";

const snow = new snowFall();

snow.start();

reciever
    .on(`environment.snowSwitch`, function (isOn) {
        if (isOn) {
            snow.createFlakes();
        } else {
            snow.clearFlakes();
        }
    })
    .on(`environment.snowParam`, function ({Snow3num = config.snow.Snow3num, Snow3Size = config.snow.Snow3Size, Snow3Speed = config.snow.Snow3Speed} = {}) {
        snow.Snow3num = Snow3num;
        snow.Snow3Size = Snow3Size;
        snow.Snow3Speed = Snow3Speed;
        snow.resetFlakes();
    })
    .on(`environment.filter`, function (params) {
        let filterStyle = ``;
        for (let [key, value] of Object.entries(config.filter)) {
            filterStyle += `${key}(${value.min + (value.max - value.min) * +params[key] / 100}${value.unit})`;
        }
        document.getElementsByTagName('html')[0].style.filter = filterStyle;
    });

sender.send(`environment.getState`);