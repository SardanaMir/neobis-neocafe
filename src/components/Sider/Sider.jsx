import { Layout } from 'antd'
import { NavLink } from 'react-router-dom'
import necafe from '../../assets/img/neocafe.svg'
import menu from '../../assets/img/menu.svg';
import archive from '../../assets/img/archive.svg';
import branch from '../../assets/img/branch.svg';
import group from '../../assets/img/group.svg';
import exit from '../../assets/img/exit.svg';
import styles from './sider.module.scss'

const Sider = () => {
  return <Layout.Sider width={221} className={styles.sider}>
    <img src={necafe} alt="neocafe" className={styles.necafe} />
    <div className={styles.list_menu}>
        <NavLink to="#" className={styles.links}><img src={menu} alt="Error :(" className={styles.sider_icon} />Меню</NavLink>
        <NavLink to="#" className={styles.links}><img src={archive} alt="Error :(" className={styles.sider_icon} />Склад</NavLink>
        <NavLink to="#" className={styles.links}><img src={branch} alt="Error :(" className={styles.sider_icon} />Филиалы</NavLink>
        <NavLink to="#" className={styles.links}><img src={group} alt="Error :(" className={styles.sider_icon} />Сотрудники</NavLink>
    </div>
    <NavLink to="#" className={styles.links_exit}><img src={exit} alt="Error :(" className={styles.sider_icon} />Выйти</NavLink>
  </Layout.Sider>
}

export default Sider
