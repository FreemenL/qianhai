import React, { PureComponent } from 'react'

interface NotFoundProps{
  staticContext: {
    NotFound?: Boolean
  }
}

export default class NotFound extends PureComponent<NotFoundProps, any>{
  
  constructor(props){
    super(props);
    const { staticContext } = this.props;
    staticContext && (staticContext.NotFound = true)
  }
  
  render() {
    return (
      <div>
        404
      </div>
    )
  }
}
