import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes';
import { getClientStore } from '../store'
import { Provider } from 'react-redux';
import { renderRoutes } from "react-router-config";
import { loadableReady } from "@loadable/component";


const App = () => {
  return(
    <Provider store={getClientStore()}>
      <BrowserRouter>
        <div>
          { renderRoutes(Routes)}
        </div>
      </BrowserRouter>
    </Provider>
  )
}

// 开始渲染之前加载所需的组件
loadableReady().then(() => {
  ReactDOM.hydrate(<App/>,document.getElementById("root"));
});