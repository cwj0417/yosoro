var path = require("path"),
    webpack = require("webpack"),
    srcPath = path.join(__dirname, "src");

let entry = {
    popup: ["babel-polyfill", path.join(srcPath, "scripts/popup.js")],
    background: ["babel-polyfill", path.join(srcPath, "scripts/background.js")],
    match: ["babel-polyfill", path.join(srcPath, "scripts/match.js")]
};
var config = {
    entry: entry,
    output: {
        path: "extension/scripts",
        filename: "[name].js"
    },
    resolve: {
        root: [path.join(__dirname, "node_modules"), srcPath],
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    },
    module: {
        loaders: [{
            test: /\.(eot|woff|woff2|ttf|svg)$/,
            loader: "file?name=fonts/[name].[ext]"
        }, {
            test: /(shCore|shBrushJava)/,
            loader: "file?name=vendor/[name].[ext]"
        }, {
            test: /jquery/,
            loader: "expose?jQuery"
        }, {
            test: /html$/,
            exclude: /index.html/,
            loader: "file?name=/[name].html"
        }, {
            test: /\.(png|jpg)$/,
            loader: "file?name=img/[name].[ext]"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.scss$/,
            loader: "style!css!postcss!sass"
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel?presets[]=stage-2!babel?presets[]=es2015!eslint-loader"
        }, {
            test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
            loader: "file?name=fonts/[name].[ext]"
        }]
    },
    eslint: {
        configFile: "./.eslintrc"
    }
};

module.exports = config;
