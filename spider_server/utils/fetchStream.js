const https = require("https");  
const hooks = require('./hooks');
const queue = hooks();
const url = require('url');

const { writeFileStream } = require("./index");

const getDataByStream = function(url,filename,end,hint="fetchStreamEnd"){
    https.get(url, function (res) {  
        let length = 0;
        res.on('data', function (data) { 
            length += data.length;
            let content = data.toString("utf8");
            queue.tapAsync(length, (tag, task, result, next) => {
                writeFileStream(filename,content,next) 
            })
        });  
        res.on("end", function(){ 
            queue.callAsync("fetchStream", (tag, task, result, next) => {
                console.log(hint);
                end&&end();
            });
        });  
    })
    .on("error", function (err) {  
        console.log(err);
    })
}

const postDataByStream = function(c_url,params,filename,end,hint){
  var urlString = url.parse(c_url);
  const post_option = Object.assign({
    host: urlString.host,
    port: 443,
    path: urlString.pathname,
    method: 'POST',
    headers: params.headers
  });
  var post_req = https.request(post_option, function(res){
      res.on('data', function (data) { 
          let content = data.toString("utf8");
          queue.tapAsync("postData", (tag, task, result, next) => {
              writeFileStream(filename,content,next) 
          })
      });  
      res.on("end", function(){ 
        queue.callAsync("fetchStream", (tag, task, result, next) => {
            console.log(hint);
            end&&end();
        });
      });  
  });
  post_req.write(JSON.stringify(params.data));
  post_req.end();
}

exports.postDataByStream = postDataByStream;
exports.getDataByStream = getDataByStream;
