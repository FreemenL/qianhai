import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getDetails } from './store/actions';
import WithStyle from '../../WithStyle';
import styles from './style.less';

class DetailComponent extends PureComponent<any,any>{
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getDetails(id)
  }
  render() {
    const { content ,name ,screenshot} = this.props.data;
    return (
      <Spin spinning={content?false:true} size="large">
      <section className="article-content">
        <div className={`${styles['detail-wrapper']}`}>
          {screenshot?<img src={screenshot} alt="screenshot"/>:null}
          <h1>{name}</h1>
        </div>
        <div className={`${styles['detail-wrapper']}`} dangerouslySetInnerHTML={{ __html:content}} >
        </div>
      </section>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.details.detail
})

const mapDispatchToProps = (dispatch) => ({
  getDetails(id){
    dispatch(getDetails(id))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(WithStyle(DetailComponent,styles))





