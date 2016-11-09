const version = process.argv[2];
if (!version) {
    console.error(`version not specified`);
    return;
}
const fs = require("fs");
const list = [`./package.json`, `./extension/manifest.json`];
for (let route of list) {
    fs.readFile(route, function (err, res) {
        if(!err) {
            let config = JSON.parse(res.toString());
            config.version = version;
            fs.writeFile(route, JSON.stringify(config));
        }
    });
}
console.log(`successfully set version of ${version}`);