const path = require("path"),
    webpack = require("webpack"),
    srcPath = path.join(__dirname, "src");

const entry = {
    popup: ["babel-polyfill", path.join(srcPath, "scripts", "popup.js")],
    options: ["babel-polyfill", path.join(srcPath, "scripts", "options.js")],
    bookmarkmanager: ["babel-polyfill", path.join(srcPath, "scripts", "bookmarkmanager.js")],
    background: ["babel-polyfill", path.join(srcPath, "scripts", "background.js")],
    match: ["babel-polyfill", path.join(srcPath, "scripts", "match.js")],
};
const output = {
    path: path.resolve("extension", "scripts"),
    filename: "[name].js"
};
const resolve = {
    extensions: [".js", ".vue"],
    alias: {
        "vue$": "vue/dist/vue.esm.js"
    },
    modules: [path.join(__dirname, "node_modules"), srcPath]
};
const rules = [
    {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: [{
            loader: "file",
            options: {
                name: "../fonts/[name].[ext]"
            }
        }]
    }, {
        test: /\.vue$/,
        use: ["vue"]
    }, {
        test: /html$/,
        exclude: /index.html/,
        use: ["file?name=/[name].html"]
    }, {
        test: /\.(png|jpg)$/,
        use: ["file?name=img/[name].[ext]"]
    }, {
        test: /\.css$/,
        use: ["style", "css"]
    }, {
        test: /\.scss$/,
        use: ["style", "css", "sass"]
    }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ["babel", "eslint"]
    }, {
        test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
        use: ["file?name=fonts/[name].[ext]"]
    }
];
let config = {
    entry,
    output,
    resolve,
    module: {
        rules
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    }
};

module.exports = config;
