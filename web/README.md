### react ssr demo

### ssr codeSplit

1. npm install @loadable/server && npm install --save-dev @loadable/babel-plugin @loadable/webpack-plugin

2. babelrc

```json
{
  "plugins": ["@loadable/babel-plugin"]
}
```

3. webpack.config.js

```js

const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  // ...
  plugins: [new LoadablePlugin()],
}

```

4. Add loadableReady client-side


```js

import { loadableReady } from '@loadable/component'

loadableReady(() => {
  const root = document.getElementById('main')
  hydrate(<App />, root)
})

```

### isomorphic-style-loader 和 style-loader 的区别：

* isomorphic-style-loader 和 style-loader 都会解析样式中的类名 但是 isomorphic-style-loader不会往head标签中插入样式

### 注意事项

* 服务器端不能使用 style-loader  因为他会使用window对象进行一些操作

# react 服务服务器端渲染 ssr 


#### TODO

* 抽离配置
* hot-load 
* 接入 eslint sentry 
* 引入 antd
* 接入后台服务
* 引入hooks



- react ssr  热加载



### 遇到的问题点：

1. 背景图闪现问题:
      url-loader 配置路径问题

### 待解决问题：

1. 静态资源重复打包问题:





