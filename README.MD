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

### extension data

enter options page to manage your extension data

#### export

1.  click `export` button
1.  copy data in textarea and save by ur own

#### import

1.  paste data in textarea
1.  click `import` button
1.  reload the extension

### extend modules

if you are senior users and want extend this project:

+   this app was built in vue2.0, vuex2.0 and ecmascript stage-2
+   add component in `src/popup/` and vuex' store in `src/store/`
+   add your module name to `src/config.js` publishing your module.

**未来をむかで　ヨーソロー　敬礼!**

### publish version
sh commit.sh "version" "commit1[, commit2[, commit3[..."

### release
see [log](RELEASE.MD)

### modules

#### countdown/countdown-status

input your count time(count by minutes), warn content and press enter to countdown
when very time comes an desktop notification will popups.

#### dict

input your word and results will be shown.
you can also select words/sentences and translate by right click menu.

#### extract

select your favored contents in webpages and right click found 'extract' to collect the contents.
clear them in popup page after you have read it.

#### todo/todo-status

input your todo and press enter to record your inspiration.
and clear them by click button `clear`.

#### tabs

if you opened several tabs and want put them aside then click retract to collect tab and watch them later.

#### environment

change page theme.

#### memo
simple multi-tab memo.

#### word

select and press ctrl/alt + b/j(by default) to collect words and meaning to yosoro, and words will shown in popup page.
custom tabs and options was available.