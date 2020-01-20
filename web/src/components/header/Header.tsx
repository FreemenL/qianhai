import React, { PureComponent } from 'react';
import  WithStyle from '../../WithStyle';
import httpAjax from '../../utils/httpAjax';
import styles from './assets/less/styles.less';
import { Layout } from 'antd';

const { Header } = Layout;

interface HeaderProps{
  weather: any,
}

export default WithStyle(class HeaderCompomnent extends PureComponent<any, HeaderProps>{
  state = {
    weather: {},
  }
  async componentDidMount(){
    const data:any = await httpAjax.get('/api/weather',{});
    this.setState((prevState,props) =>({...prevState,weather: data.result}))
  }
  render() {
    const { weather:{ weather_icon ,days, week ,temperature ,weather_curr} } = this.state;
    return (
      <Header className={styles['header']}>
        <div className={`${styles['logo']}`}>
          前  海
        </div>
        <div className={styles['weather']}>
          <span>{days}</span>
          <span>{week}</span>
          <span>{temperature}</span>
          <img src={weather_icon} alt=""/>
        </div>
      </Header>
    )
  }
}, styles)
