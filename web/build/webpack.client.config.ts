export const path = require("path");
export const { appSrc , node_modules}  = require("./paths");
export const merge = require('webpack-merge');
export const LoadablePlugin = require('@loadable/webpack-plugin')
export const baseConfig = require('./webpack.base.ts')

module.exports = merge(baseConfig,{
  mode: "development",
  entry:  "./src/client/index",
  output: {
    filename: 'static/js/[name]_[contenthash:8].js',
    path: path.resolve(__dirname, 'dist/web'),
    publicPath: '/web/',
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: ['style-loader',{
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      }, 'postcss-loader','less-loader'],
      include: [appSrc]
    }]
  },
  optimization: {
    splitChunks: {
      chunks: "all",  // chunk选择范围
      cacheGroups: {
        vendor: {
          test: function(module) {
            // 阻止.css文件资源打包到vendor chunk中
            if(module.resource && /\.css$/.test(module.resource)) {
              return false;
            }
            // node_modules目录下的模块打包到vendor chunk中
            return module.context && module.context.includes("node_modules");
          }
        }
      }
    },
    // webpack引导模块
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins: [ 
    new LoadablePlugin({
      filename: 'client-manifest.json',
    })
  ]
})