export const path = require("path");
export const { appSrc ,node_modules }  = require("./paths");
export const baseConfig = require('./webpack.base.ts')
export const LoadablePlugin = require('@loadable/webpack-plugin')
export const nodeExternals = require('webpack-node-externals');
export const merge = require('webpack-merge');
export const srcPath = path.resolve(process.cwd(), 'src');
export const fs = require('fs');
export const lessToJs = require('less-vars-to-js');
export const themeVariables = lessToJs(fs.readFileSync(path.join(srcPath, 'ant-theme-vars.less'), 'utf8'));

module.exports = merge(baseConfig, {
  target: "node",
  mode:  "development",
  entry: './src/server/index.ts',
  externals: ['@loadable/component', nodeExternals({
    whitelist: [/\.(css|less|sass|scss)$/, /^antd.*?css/],
    modulesDir: node_modules
  })],
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
                  libraryDirectory: 'lib',
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
        loader:'isomorphic-style-loader',
      },{
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        }
      }, {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }]
    },{
      test: /\.(le|c)ss$/,
      use: ['isomorphic-style-loader',{
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      }, 'postcss-loader', {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }],
      include: [appSrc]
    }]
  },
  output: {
    filename: 'server.js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(process.cwd(), 'dist/node'),
    libraryTarget: 'commonjs2',
    publicPath: '/node/',
  },
  plugins: [ 
    new LoadablePlugin({
      filename: 'server-manifest.json',
    })
  ]
})

