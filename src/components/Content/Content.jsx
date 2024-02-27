import { Route, Routes, Navigate  } from 'react-router-dom'
import { Layout } from 'antd'
import StoreHouse from '../../components/Storehouse/Storehouse'
import styles from './content.module.scss'
import Menu from '../../pages/Menu'
import Staff from '../../pages/Staff'
import Storehouse from '../../components/Storehouse/Storehouse'
import Affiliate from '../../components/Affiliate/Affiliate'


const Content = () => {
  // const isAuth = useSelector((state) => state.user.isAuth);

  // // Функция для защиты доступа к маршрутам
  // const ProtectedRoute = ({ element, path }) => {
  //   return isAuth ? element : <Navigate to="/login" />;
  // };
  return (
    <Layout.Content className={styles.content}>
      <Routes>
        <Route path='/menu' element={<Menu />} />
        <Route path='/storehouse' element={<Storehouse />} />
        <Route path='/affiliates' element={<Affiliate />} />
        <Route path='/staff' element={<Staff />} />
      </Routes>
    </Layout.Content>
  )
}

export default Content
