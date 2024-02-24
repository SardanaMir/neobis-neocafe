import { Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'
import StoreHouse from '../../components/Storehouse/Storehouse'
import styles from './content.module.scss'
import Menu from '../../pages/Menu'
import Storehouse from '../../components/Storehouse/Storehouse'
import Affiliate from '../../components/Affiliate/Affiliate'
import MainRoutes from '../../router/MainRoutes'


const Content = () => {
  return (
    <Layout.Content className={styles.content}>
      <MainRoutes />
    </Layout.Content>
  )
}

export default Content
