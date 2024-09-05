const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
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
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: 'public',
                to: ''
            }
            ],
            options: {
                concurrency: 10
            }
        })
    ],
    output: {
        filename: 'x509.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
}
