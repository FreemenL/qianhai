import React, { PureComponent } from 'react'

export default class Login extends PureComponent{
  render() {
    console.log('render');
    return (
      <div>
        Login pagesss
        <button onClick={()=>{alert('qq')}}>click</button>
      </div>
    )
  }
}
