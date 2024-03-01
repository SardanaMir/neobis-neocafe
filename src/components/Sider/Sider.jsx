import { Layout } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import necafe from '../../assets/img/neocafe.svg'
import menu from '../../assets/img/menu.svg';
import archive from '../../assets/img/archive.svg';
import branch from '../../assets/img/branch.svg';
import group from '../../assets/img/group.svg';
import exit from '../../assets/img/exit.svg';
import { deleteAuthTokenFromCookie } from '../../utils';
import styles from './sider.module.scss'

const Sider = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const handleLogout = () =>{
    deleteAuthTokenFromCookie()
    dispatch(setUser(false))
  }
  return <Layout.Sider width={221} className={styles.sider}>
    <img src={necafe} alt="neocafe" className={styles.necafe} />
    <div className={styles.list_menu}>
        <NavLink 
          to="/menu" 
          className={styles.links} 
        >
          <img 
            src={menu} alt="Error :(" 
            className={styles.sider_icon}  
          />
          Меню
        </NavLink>
        <NavLink 
          to="/storehouse" 
          className={styles.links}
        >
          <img src={archive} 
            alt="Error :(" 
            className={styles.sider_icon} 
          />
          Склад
        </NavLink>
        <NavLink 
          to="/affiliates" 
          className={styles.links}
        >
          <img src={branch} 
            alt="Error :(" 
            className={styles.sider_icon} 
          />
          Филиалы
        </NavLink>
        <NavLink 
          to="/staff" 
          className={styles.links}
        >
          <img src={group} 
            alt="Error :(" 
            className={styles.sider_icon} 
          />
          Сотрудники
        </NavLink>
    </div>
    <NavLink 
      to="/login" 
      className={styles.links_exit}
      onClick={handleLogout}
    >
      <img src={exit} 
        alt="Error :(" 
        className={styles.sider_icon} 
      />
      Выйти
    </NavLink>
  </Layout.Sider>
}

export default Sider
