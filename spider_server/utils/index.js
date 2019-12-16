const { cloneDeep } = require("lodash");
const merge = require("lodash.merge");
const fs = require("fs");


const mergeObj = function(current,target){
    return merge(cloneDeep(current), target);
}

// 以流的方式写入文件
const writeFileStream = (function(){
    let isFirst = false;
    return function(filename,content,next,options={flag:"a"}){
        if(!isFirst){
          writeFile(filename,content,options,next);
        }else{
          isFirst = true;
          appendFile(filename,content,next);
        }
    }
})();

// 写入文件
const writeFile = function(filename,content,options,callback){
    fs.writeFile(filename,content,{...options},function (err) {
        if(err){
            console.log(err);
        }else {
            callback&&callback();
        }
    })
};

// 文件追加内容
const appendFile = function(filename,content,callback){
    fs.appendFile(filename,content,function(error){
        if(error){
            console.log(error)
        }else{
            callback&&callback();
        }
    })
} 

exports.writeFileStream = writeFileStream;
exports.mergeObj = mergeObj;