import React, { PureComponent } from 'react';
import  WithStyle from '../../WithStyle';
import styles from './assets/less/styles.less';
import logoPic from './assets/images/logo.png'

export default WithStyle(class Header extends PureComponent{
  render() {
    return (
      <div className={styles.header}>
        <img src={logoPic} alt="logo" className={styles.logo}/>
      </div>
    )
  }
}, styles)
