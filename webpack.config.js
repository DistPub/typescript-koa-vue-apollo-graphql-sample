const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    devtool: '#eval-source-map',
    entry: {
        index: ['./client_source/index.ts'],
        arrange: ['./client_source/arrange.ts'],
    },
    output: {
        path: path.resolve(__dirname, './client_dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue(\?.*)?$/,
                loader: 'vue-loader',
            },
            {
                test: /\.gql(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
            {
                test: /\.css(\?.*)?$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.scss(\?.*)?$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.ts(\?.*)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                use: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            optipng: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebpackPlugin({
            favicon: './client_source/favicon.ico',
            template: './client_source/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            favicon: './client_source/favicon.ico',
            template: './client_source/index.html',
            chunks: ['arrange'],
            filename: 'arrange.html',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            'node_modules',
            'node_modules/vue-style-loader/lib',
            'node_modules/element-ui/lib',
        ],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        }
    },
};

if (process.env.NODE_ENV === 'production') {
    module.exports.mode = 'production';
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ])
}
