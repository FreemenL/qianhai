import React, { PureComponent } from 'react'
import httpAjax from '../../utils/httpAjax';
import WithStyle from '../../WithStyle';
import styles from './index.less';
import { Spin } from 'antd';

class DetailComponent extends PureComponent<any,any>{
  state= {
    content: ""
  }
  async componentDidMount() {
    const res:any = await httpAjax.get(`/api/articles/tb/${this.props.match.params.url}`,{});
    document.head.innerHTML += res.styleString;
    this.setState((prevState,props)=>({
      content:res.content
    }))
  }
  render() {
    const { content }  = this.state;
    return (
      <Spin spinning={content?false:true} size="large">
        <section className={styles['section-content']} dangerouslySetInnerHTML={{ __html:content}}>
        </section>
      </Spin>
    )
  }
}

export default WithStyle(DetailComponent,styles)
