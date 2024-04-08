import { Layout } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import necafe from "../../assets/img/neocafe.svg";
import menu from "../../assets/img/menu.svg";
import archive from "../../assets/img/archive.svg";
import branch from "../../assets/img/branch.svg";
import group from "../../assets/img/group.svg";
import exit from "../../assets/img/exit.svg";
import { deleteAuthTokenFromCookie } from "../../utils";
import styles from "./sider.module.scss";

const Sider = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    deleteAuthTokenFromCookie();
    dispatch(setUser(false));
  };
  return (
    <Layout.Sider width={221} className={styles.sider}>
      <img src={necafe} alt="neocafe" className={styles.necafe} />
      <div className={styles.flex}>
        <div className={styles.list_menu}>
          <NavLink
            to="/menu"
            className={({ isActive, isPending, isTransitioning }) =>
              [styles.links, isActive ? styles.active : styles.links].join(" ")
            }
          >
            <img src={menu} alt="Error :(" className={styles.sider_icon} />
            Меню
          </NavLink>
          <NavLink
            to="/storehouse"
            className={({ isActive, isPending, isTransitioning }) =>
              [styles.links, isActive ? styles.active : styles.links].join(" ")
            }
          >
            <img src={archive} alt="Error :(" className={styles.sider_icon} />
            Склад
          </NavLink>
          <NavLink
            to="/affiliates"
            className={({ isActive, isPending, isTransitioning }) =>
              [styles.links, isActive ? styles.active : styles.links].join(" ")
            }
          >
            <img src={branch} alt="Error :(" className={styles.sider_icon} />
            Филиалы
          </NavLink>
          <NavLink
            to="/staff"
            className={({ isActive, isPending, isTransitioning }) =>
              [styles.links, isActive ? styles.active : styles.links].join(" ")
            }
          >
            <img src={group} alt="Error :(" className={styles.sider_icon} />
            Сотрудники
          </NavLink>
        </div>
        <NavLink
          to="/login"
          className={styles.links_exit}
          // className={({ isActive, isPending, isTransitioning }) =>
          //   [
          //     styles.links_exit,
          //     isActive ? styles.active : styles.links_exit,
          //   ].join(" ")
          // }
          onClick={handleLogout}
        >
          <img src={exit} alt="Error :(" />
          Выйти
        </NavLink>
      </div>
    </Layout.Sider>
  );
};

export default Sider;
