import React from 'react';
import  WithStyle from './WithStyle';
import { renderRoutes } from "react-router-config";
import styles from 'antd/dist/antd.less';
import istyles from './index.less';
import { Layout} from 'antd';

const { Header, Content, Footer } = Layout;

const App = (props)=> {
    return (
        <Layout>
        <Header className={istyles['header']}>
          <div className={istyles['logo']}>
            -q
          </div>
        </Header>
        <Content>
          {renderRoutes(props.route.routes)}
        </Content>
        <Footer style={{ textAlign: 'center' }}> 前海 ©2020 Created by 学而思网校1对1前端团队</Footer>
      </Layout>
    )
}

export default WithStyle(App ,[styles,istyles]);
