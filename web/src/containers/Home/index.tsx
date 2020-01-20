import React ,{ PureComponent , Fragment }from 'react'
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';
import  WithStyle from '../../WithStyle';
import styles from './style.less';
import { Card,  Col, Row } from 'antd';

interface Props {
  tbList: Array<any>,
  list: Array<any>,
  getHomeList: Function,
  history: any,
  weather: any,
}

class Home extends PureComponent<Props, any> {
  cardlayout
  emptyLayout
  styleElement
  constructor(props){
    super(props);
    this.styleElement = null;
    this.weekChange = this.weekChange.bind(this);
    this.cardlayout= { xl:12,lg:12,md:12,sm:24,xs:24 };
    this.emptyLayout= { xl:6,lg:6,md:6,sm:24,xs:24 };
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
          <span> 来源: 掘金</span>    
        </p>
       <p className={styles["list-content"]}>{item.title}</p>
    </li>)
  }

  renderTBItem(){
    return (item)=>(<li key={item.id} onClick={()=>this.jumpTBDetail(item.originalUrl)}>
        <p className={styles["list-title"]}> 
          <span>作者: {item.auther}</span>  
          <span>发布时间: {item.time}</span>
          <span> 来源: 淘宝前端博客</span>         
        </p>
       <p className={styles["list-content"]}>{item.title}</p>
    </li>)
  }

  getList(){
    const { list } = this.props;
    return list.map(this.renderItem());
  }

  getTBList() {
    const { tbList } = this.props;
    return tbList.map(this.renderTBItem());
  }
  // 跳转展示页面详情
  jumpDetail = (url) => { 
    const { history } = this.props;
    history.push({pathname:`/details/${url}`});
  }
  // 跳转展示页面详情
  jumpTBDetail = (url) => { 
    const { history } = this.props;
    history.push({pathname:`/tbdetails/${encodeURIComponent(url)}`});
  }
  // componentDidMount 这个生命周期只会在客户端渲染的时候执行 所以列表是由客户端渲染出来的
  componentDidMount() {
    this.styleElement = document.createElement("style");
    this.styleElement.innerHTML='html{font-size:100px!important;}'
    document.head.appendChild(this.styleElement);
    if(!this.props.list.length){
      this.props.getHomeList();
    }
  }

  componentWillUnmount(){
    document.head.removeChild(this.styleElement);
  }

  render(){
    return (
      <Fragment>
        <Helmet>
          <title> 前海 </title>
          <meta name="description" content="Helmet"></meta>
        </Helmet>
        <Row style={{marginTop:'10px'}}>
          <Col {...this.emptyLayout}>
          </Col>
          <Col {...this.cardlayout}>
            <Card title="最新推荐">
              <div className={styles['article-container']}>
                <ul>
                  { this.getList() }
                  { this.getTBList() }
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.home.name,
  list: state.home.newList,
  tbList: state.home.tbList,
})

const mapDispatchToProps = (dispatch) => ({
  getHomeList(){
    dispatch(getHomeList())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(WithStyle(Home,styles,getHomeList))
