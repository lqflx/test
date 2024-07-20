const { clear } = require('console')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const webpack = require('webpack')


const config = {
  // mode: 'development',
  mode: 'production',
  entry: path.resolve(__dirname, 'src/utils/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './login/index.js',
    clean: true //清除输出目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 模板文件
      filename: './login/index123.html' // 输出文件
    }),
    new MiniCssExtractPlugin({
      filename:'./login/index.css'
    }),
    new webpack.DefinePlugin({
      // key 是注入到打包后的前端 JS 代码中作为全局变量
      // value 是变量对应的值（在 corss-env 注入在 node.js 中的环境变量字符串）
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: { // 加载器
    rules: [ // 规则列表
      {
        test: /\.css$/i, // 匹配 .css 结尾的文件
        // use: ['style-loader', 'css-loader'], // 使用从后到前的加载器来解析 css 代码和插入到 DOM
        use: [process.env.NODE_ENV === 'development'?'style-loader': MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [ process.env.NODE_ENV === 'development' ?'style-loader': MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }
    ],
  },
  optimization: {
    // 最小化
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 
      // `terser-webpack-plugin`），将下一行取消注释（保证 JS 代码还能被压缩处理）
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}

if(process.env.NODE_ENV === 'production'){
  config.devtool = 'inline-source-map'
}

module.exports = config;
