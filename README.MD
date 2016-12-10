
### introduction
this chrome extension provides multiple, extendable modules of daily tools.


### installation
+   clone this repo
+   run `npm i`
+   run `npm i webpack -g`
+   run `npm run build`
+   visit `chrome://extensions`
+   click `load unpacked extensions` and choose `extension` folder

*you can pack it as your wish.*

### usage
+   right click extension icon and click `options`
+   now you can see some modules and check your favor modules

### extend modules

if you are senior users and want extend this project:

+   this app was built in vue2.0, vuex2.0 and ecmascript stage-2
+   add component in `src/popup/` and vuex' store in `src/store/`
+   add your module name to `src/config.js` publishing your module.

**未来をむかで　ヨーソロー　敬礼!**

### publish version
sh commit.sh "version" "commit1[, commit2[, commt3[..."

### release
see [log](RELEASE.MD)