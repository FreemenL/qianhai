export const path = require("path");
export const fs = require("fs");
export const { appSrc , node_modules, appExcludeCssModule}  = require("./paths");
export const merge = require('webpack-merge');
export const LoadablePlugin = require('@loadable/webpack-plugin');
export const baseConfig = require('./webpack.base.ts');
export const lessToJs = require('less-vars-to-js');
export const srcPath = path.resolve(process.cwd(), 'src');
export const themeVariables = lessToJs(fs.readFileSync(path.join(srcPath, 'ant-theme-vars.less'), 'utf8'));

module.exports = merge(baseConfig,{
  mode: "development",
  entry:  "./src/client/index",
  output: {
    filename: 'static/js/[name]_[contenthash:8].js',
    path: path.resolve(process.cwd(), 'dist/web'),
    publicPath: '/web/',
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
          babelOptions: {
            babelrc: false,
            presets: ["@babel/preset-react", ["@babel/preset-env", {
                  targets: {
                    browsers: ["last 2 versions"]
                  }
                }
              ]
            ],
            plugins: [
              "@loadable/babel-plugin",
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: 'css'
                }
              ]
            ]
          },
          reportFiles: [
            "src/**/*.{ts,tsx}",
            "server/**/*.{ts,tsx}"
          ],
          configFileName: path.resolve(fs.realpathSync(process.cwd()),'tsconfig.json')
      }}],
      exclude: /node_modules/
      },{
      test: /\.(le|c)ss$/,
      exclude:[ srcPath ],
      use: [{
        loader:'style-loader',
      },{
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        }
      }, {
        loader: "less-loader",
        options: {
          modifyVars: themeVariables,
          javascriptEnabled: true
        }
      }]
    },{
      test: /\.(le|c)ss$/,
      use: ['style-loader',{
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      },'postcss-loader', {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }],
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