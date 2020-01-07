export const  webpack = require("webpack");
export const chalk  = require('chalk');
export const spawn = require('cross-spawn');
export const fs = require('fs');
export const path = require('path');
export const rimraf = require("rimraf");
export const WebpackClientConfig  = require('./webpack.client.config');
export const WebpackServerConfig  = require('./webpack.server.config');

export const distPath = path.resolve(__dirname, '../dist')
export const hasDistDirectory  = fs.existsSync(distPath);

let count = 0;
//异步流
class AsyncHook{
  hooks:Array<any>
  constructor(){
    this.hooks = [];
  }
  /**
   * 订阅
   * name 当前订阅者 
   * fn   收到消息后执行的函数
  */
  tapAsync(name,fn){
      /**fn 函数接受四个参数 
       * tag |string当前执行者 
       * task|string任务 
       * result |any 前一个执行结果 
       * next | Functon下一个任务 当前的执行结果传给next
      **/
      this.hooks.push({name,fn});
  }
  /**
   *args[0] | any 任务
   *args[1] | Function 最终的回调
   */
  callAsync(...args){
      const task = args[0];
      const done = args[args.length-1];
      let index = 0;
      const next = (result?)=>{      
          this.hooks[index]?this.hooks[index]["fn"](this.hooks[index]["name"],task,result,next):done(task,result);
          index++;
      }   
      next();
  }
}

const queue = new AsyncHook;

// 删除 dist 目录
queue.tapAsync("rm dist", (tag, task, result, next) => {
  if(hasDistDirectory){
    return rimraf(distPath,()=>{
      console.log(chalk.green(`dist directory has removed`));
      next();
    });
  }
  next();
})

// 开始构建 客户端代码
queue.tapAsync("delDev", (tag, task, result, next) => {
  webpack(WebpackClientConfig).watch({
    aggregateTimeout: 300,
    ignored: /node_modules/
  }, (err: Error) => {
    if(!err){
      next()
    }
  })
})
/**
* 开始构建 服务端代码
*/
queue.tapAsync("start building...", (tag, task, result, next) => {
  webpack(WebpackServerConfig).watch({
    aggregateTimeout: 300,
    ignored: /node_modules/
  }, (err: Error) => {
    if(!err){
      next()
    }
  })
})

// nodemon 启动 server
queue.callAsync("build", (task,result) => {
  if(!count){
    count++
    spawn('nodemon', ['--watch', 'dist/**/*', './dist/node/server.js'], {
      // detached: true, //保证父进程结束，子进程仍然可以运行
      stdio: 'inherit',
      cwd: process.cwd()
    })
  }
});


queue.callAsync("build", (task,result) => {
  process.stdout.write(chalk.green(`server start at http://localhost:3000`));
});
