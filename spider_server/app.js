const express = require("express")
const app = express()

app.use(express.static('public'))

// const { postDataByStream } = require("./utils/fetchStream");
// const filename = "public/api/jueJinList.json";

// postDataByStream("https://web-api.juejin.im/query",{
//     headers: {
//       "X-Agent": "Juejin/Web",
//       "Content-Type": "application/json"
//     },
//     data: {
//       operationName:"",
//       query: "",
//       variables:{
//         tags:["555e9a77e4b00c57d9955d64"],
//         category:"5562b415e4b00c57d9b94ac8",
//         first:20,
//         after:"",
//         order:"POPULAR"
//       },
//       extensions:{
//         query:{
//           id:"653b587c5c7c8a00ddf67fc66f989d42"
//         }
//       }
//     }
//   },
//   filename,
//   function(){
//     console.log(`request Data end func`);
//   },
//   "request Data end");

app.listen(4000, () => {console.log('running 4000')})



