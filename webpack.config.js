const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true, // 使用多进程并行运行来提高构建速度
            extractComments: false // 是否将注释提取到单独的文件中
        })]
    },
    output: {
        library: {
            name: 'X509',
            type: 'window',
            export: 'default'
        },
        filename: 'x509.js',
        path: path.resolve(__dirname, 'dist'),
        clean: false
    }
}
