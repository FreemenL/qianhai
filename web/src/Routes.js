import loadable from "@loadable/component";

export default [
  {
    key: "app",
    path: "/",
    component: loadable(() => import(/* webpackChunkName: "App" */ "./App")),
    routes:[{ 
        key: "Home",
        path: "/",
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "Home" */ "./containers/Home")),
        loadData: require("./containers/Home").default.loadData
      },{
        key: "TBDetails",
        path: "/tbdetails/:url",
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "Details" */ "./containers/TBDetails")),
      },{
        key: "Details",
        path: "/details/:id",
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "Details" */ "./containers/Details")),
      },{
        key: "Login",
        path: "/login",
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "Login" */"./containers/Login")),
      },{
        path: "*",
        component: loadable(() => import(/* webpackChunkName: "NotFound" */"./containers/NotFound")),
      }
    ]
  }
]