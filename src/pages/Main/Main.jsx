import { Layout } from 'antd'
import styles from './main.module.scss'
import Sider from '../../components/Sider/Sider';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';

const Main = () => {
    return (
        <Layout className={styles.layout}>
          <Sider />
          <Layout>
            <Header />
            <Content />
          </Layout>
        </Layout>
      )
};

export default Main;
