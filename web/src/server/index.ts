import path from 'path';
import http from 'http'
import express from 'express';
import proxy from 'express-http-proxy';
import reload from 'reload'
import { matchRoutes } from "react-router-config";

import { render } from './utils';
import { getStore } from '../store';
import Routes from '../Routes';

const app = express();
var server = http.createServer(app)

app.set('port', 8888);

app.use(express.static(path.resolve(process.cwd(),'dist')));

app.use('/api', proxy('http://127.0.0.1:7001', {
  proxyReqPathResolver: function(req) {
    return '/api'+req.url
  }
}));

app.get("*", (req,res) => {

  const store = getStore();

  const matchedRoutes = matchRoutes(Routes, req.path);

  const promises: Array<any>= [];

  matchedRoutes.forEach( item => {
    if(item.route.loadData){
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve);
      })
      promises.push(promise);
    }
  })
  
  Promise.all(promises).then(() => {
    const context:any = {
      css:[]
    }
    const html = render(store, Routes, req, context);
    if(context.NotFound){
      res.status(404)
      res.send(html)
    }else{
      res.send(html)
    }
  })
})

reload(app).then(function (reloadReturned) {
  server.listen(app.get('port'), function () {
    console.log(`Web server listening at  http://localhost:${app.get('port')}`)
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})
