const path = require('path'),
    miniCss = require('mini-css-extract-plugin'),
    SRC_PATH = path.resolve(__dirname, './app/main.js'),
    DEST_PATH = path.resolve(__dirname, '../app/static/js'),
    MODULES_PATH = path.resolve(__dirname, './node_modules'),
    processSass = require('./svelte-sass-processor');

module.exports = {
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    entry: {
        app: SRC_PATH
    },
    output: {
        filename: 'app.min.js',
        chunkFilename: 'app.min.js',
        path: DEST_PATH
    },
    resolve: {
        alias: {
            'svelte': path.resolve(MODULES_PATH, 'svelte'),
            'destyleCss': path.resolve(MODULES_PATH, 'destyle.css')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'svelte-loader',
                        options: {
                            preprocess: {
                                style: processSass
                            },
                            emitCss: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    miniCss.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [new miniCss({
        filename: '../css/[name].css'
    })]
};