const path = require('path'),
    miniCss = require('mini-css-extract-plugin'),
    SRC_PATH = path.resolve(__dirname, './app/main.js'),
    DEST_PATH = path.resolve(__dirname, '../app/static/js'),
    MODULES_PATH = path.resolve(__dirname, './node_modules'),
    processSass = require('./svelte-sass-processor');

const mode = process.env.NODE_ENV || 'development',
    isDev = mode === 'development',
    plugins = isDev ? undefined : [new miniCss({filename: '../css/[name].css'})];

module.exports = {
    mode: mode,
    watch: false,
    devtool: 'source-map',
    entry: {
        app: [SRC_PATH]
    },
    output: {
        filename: 'app.js',
        chunkFilename: 'app.js',
        path: DEST_PATH,
        publicPath: '/static/js/' // needed for HMR
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
                        loader: 'svelte-loader-hot',
                        options: {
                            preprocess: {
                                style: processSass
                            },
                            emitCss: !isDev,
                            hotReload: isDev,
                            hotOptions: {
                                noPreserveState: false, // Default: false
                                optimistic: false // Default: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    isDev ? 'style-loader' : miniCss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : miniCss.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins,
    devServer: {
        publicPath: 'http://127.0.0.1:5000/static/js/',
        proxy: {
            '/': 'http://127.0.0.1:5000'
        },
        hot: true
    }
};