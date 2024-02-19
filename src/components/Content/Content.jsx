import { Route, Routes, Navigate  } from 'react-router-dom'
import { Layout } from 'antd'
import StoreHouse from '../../components/Storehouse/Storehouse'
import styles from './content.module.scss'
import Menu from '../../pages/Menu'
import Staff from '../../pages/Staff'
import Storehouse from '../../components/Storehouse/Storehouse'
import Affiliate from '../../components/Affiliate/Affiliate'
import LoginContainer from '../../pages/Login/LoginContainer'


const Content = () => {
  // const isAuth = useSelector((state) => state.user.isAuth);

  // // Функция для защиты доступа к маршрутам
  // const ProtectedRoute = ({ element, path }) => {
  //   return isAuth ? element : <Navigate to="/login" />;
  // };
  return (
    <Layout.Content className={styles.content}>
      <Routes>
        {/* <Route path='/' element={<ProtectedRoute element={<Menu />} path='/' />} />
        <Route path='/storehouse' element={<ProtectedRoute element={<Storehouse />} path='/' />} />
        <Route path='/affiliates' element={<ProtectedRoute element={<Affiliate />} path='/' />}/>
        <Route path='/staff' element={<ProtectedRoute element={<Staff />} path='/' />} /> */}
        {/* <Route path='/' element={<Menu />} />
        <Route path='/storehouse' element={<Storehouse />} />
        <Route path='/affiliates' element={<Affiliate />}/>
        <Route path='/staff' element={<Staff />} /> */}
        <Route path='/' element={<LoginContainer />} /> 
      </Routes>
    </Layout.Content>
  )
}

export default Content
