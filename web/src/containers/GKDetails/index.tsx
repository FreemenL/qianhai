import React, { PureComponent } from 'react'
import httpAjax from '../../utils/httpAjax';
import WithStyle from '../../WithStyle';
import styles from './index.less';
import { Spin } from 'antd';

class GKDetailComponent extends PureComponent<any,any>{
  state= {
    content: ""
  }
  async componentDidMount() {
    const res:any = await httpAjax.get(`/api/articles/team/geekbang/${this.props.match.params.url}`,{});
    this.setState((prevState,props)=>({
      content:res.content
    }))
  }
  render() {
    const { content }  = this.state;
    return (
      <Spin spinning={content?false:true} size="large">
        <section className='main-content'>
          <section className='article-main'>
              <section className={`${styles['section-content']} article-typo article-content`} dangerouslySetInnerHTML={{ __html:content}}>
              </section>
          </section>
        </section>
      </Spin>
    )
  }
}

export default WithStyle(GKDetailComponent,styles)


// <Spin spinning={content?false:true} size="large">
//         <section className={styles['section-content']} dangerouslySetInnerHTML={{ __html:content}}>
//         </section>
//       </Spin>
