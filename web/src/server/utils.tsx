import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { renderRoutes } from "react-router-config"; 
import { ChunkExtractor } from "@loadable/server";
import { Helmet } from "react-helmet";
import { resolve } from 'path';

export const render = (store,routes,req,context)=>{

  const statsFile = resolve("./dist/web/client-manifest.json");
  const extractor = new ChunkExtractor({ 
    statsFile
   });
   
  const content = renderToString(extractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <div>
            { renderRoutes(routes) }
          </div>
        </StaticRouter>
      </Provider>
    ))  

    const helmet = Helmet.renderStatic();
    let cssStr = context.css.length ? context.css.join('\n'):"";
    cssStr+=`html{font-size:100px}`;
    return (`
      <html>
        <head>
          <meta name="referrer" content="never">
          <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
          <link rel="stylesheet" href='https://b-gold-cdn.xitu.io/v3/static/css/0.ad3a7e230eceef907247.css'/>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          <style>${cssStr}</style>
        </head> 
        <body>
          <div id="root">${content}</div>
          <script>
            window.context = {
              state: ${JSON.stringify(store.getState())}
            }
          </script>\n${extractor.getScriptTags()}
          <script src="/reload.js"></script>
        </body>
      </html>
    `)
}

