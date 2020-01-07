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
    rules: [{
      test: /\.(ts|tsx)$/,
      use: [{
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          useBabel: true,
          transpileOnly: true,
          useTranspileModule: false,
          sourceMap: true,
          forceIsolatedModules: true,
          babelCore: "@babel/core",
          reportFiles: [
            "src/**/*.{ts,tsx}",
            "server/**/*.{ts,tsx}"
          ],
          configFileName: path.resolve(fs.realpathSync(process.cwd()),'tsconfig.json')
      }}],
      exclude: /node_modules/
      },{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    }, {
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



