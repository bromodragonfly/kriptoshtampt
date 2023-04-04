const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const tsRule = {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
}

const plugins = [
    // Копируем файлы в папку назначния
    new CopyWebpackPlugin({
        patterns: [{ from: 'public', to: '.' }],
    }),
    new CleanWebpackPlugin(),
]

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        contentscript: './src/contentscript.ts',
    },

    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
    },
    module: {
        rules: [tsRule],
    },
    plugins,
}
