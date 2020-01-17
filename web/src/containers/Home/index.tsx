import React ,{ PureComponent , Fragment }from 'react'
// import { DatePicker } from 'antd';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';
import  WithStyle from '../../WithStyle';
import styles from './style.less';
// const { WeekPicker } = DatePicker;

interface Props {
  list: Array<any>,
  getHomeList: Function,
  history: any
}

class Home extends PureComponent<Props, any> {

  constructor(props){
    super(props);
    this.weekChange = this.weekChange.bind(this);
  }

  weekChange(date, dateString){
    console.log(date, dateString);
  }

  renderItem(){
    return (item)=>(<li key={item.id} onClick={()=>this.jumpDetail(item.postId)}>
        <p className={styles["list-title"]}> 
          <span>作者: {item.user.username}</span>  
          <span>发布时间: {item.createdAt.split('T')[0]}</span>    
          <span> star 数: {item.likeCount}</span>    
        </p>
       <p className={styles["list-content"]}>{item.title}</p>
    </li>)
  }

  getList(){
    const { list } = this.props;
    return list.map(this.renderItem());
  }
  // 跳转展示页面详情
  jumpDetail = (url) => { 
    const { history } = this.props;
    history.push({pathname:`/details/${url}`});
  }
  // componentDidMount 这个生命周期只会在客户端渲染的时候执行 所以列表是由客户端渲染出来的
  componentDidMount() {
    if(!this.props.list.length){
      this.props.getHomeList();
    }
  }
  
  render(){
    return (
      <Fragment>
        <Helmet>
          <title> 前海 </title>
          <meta name="description" content="Helmet"></meta>
        </Helmet>
        <div className={ styles['article-container'] }>
          <ul>
            { this.getList() }
          </ul>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.home.name,
  list: state.home.newList
})

const mapDispatchToProps = (dispatch) => ({
  getHomeList(){
    dispatch(getHomeList())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(WithStyle(Home,styles,getHomeList))
