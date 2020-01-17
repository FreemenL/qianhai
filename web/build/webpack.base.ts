export const path = require("path");
export const fs = require("fs");
export const webpack = require("webpack");
export const LoadablePlugin = require('@loadable/webpack-plugin')
export const srcPath = path.resolve(process.cwd(), 'src');

module.exports = {
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
    alias: {
      '@src': srcPath,
      '@components': `${srcPath}/components`
    }
  },
  module: {
    rules: [
    {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    }, 
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use:[{
        loader: 'url-loader',
        options: {
          limit: 25000,
          name:'static/imgs/[name].[ext]?[hash]'
        }
      }]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use:[{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:'static/vedio/[name].[ext]?[hash]'
        }
      }]
    }]
  },

  plugins: [ 
    new webpack.ProgressPlugin()
  ]
}



