import React,{ Component } from 'react'

export default (DefaultComponent,styles,loadData?:any) => class WithStyle extends Component<any,any>{

  static loadData(store){
    // 这个函数负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    if(loadData){
      return store.dispatch(loadData())
    }
  }
  
  constructor(props){
    super(props)
    if(this.props.staticContext){
      this.props.staticContext.css.push(styles._getCss())
    }
  }
  
  render(){
    return(
      <DefaultComponent {...this.props}/>
    )
  }
}