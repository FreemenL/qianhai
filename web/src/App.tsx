import React from 'react';
import  WithStyle from './WithStyle';
import  HeaderCompomnent from '@components/header/Header';
import { renderRoutes } from "react-router-config";
import styles from 'antd/dist/antd.less';
import istyles from './index.less';
import { Layout} from 'antd';

const { Content, Footer } = Layout;

const App = (props)=> {
    return (
      <Layout className={istyles['layout']}>
        <HeaderCompomnent/>
        <Content className={istyles['content']}>
          {renderRoutes(props.route.routes)}
        </Content>
        <Footer className={istyles['footer']}> 学而思 网校1对1 前端技术团队出品 </Footer>
      </Layout>
    )
}

export default WithStyle(App ,[styles,istyles]);
