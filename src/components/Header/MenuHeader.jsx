import { PlusOutlined } from "@ant-design/icons";
import searchIcon from "../../assets/img/Vector.svg";
import { useDispatch } from "react-redux";
import { Layout } from "antd";
import { openModal } from "../../redux/slices/modalSlice.js";
import bell from "../../assets/img/Bell.svg";
import styles from "./header.module.scss";

const MenuHeader = () => {
  const dispatch = useDispatch();

  const handleEditModalOpen = () => {
    dispatch(
      openModal({
        modalType: "addNewItem",
        modalProps: {},
      })
    );
  };
  return (
    <Layout.Header className={styles.header}>
      <h2>Меню</h2>
      <div className={styles.header__list}>
        <img src={searchIcon} alt="Error :(" className={styles.btn_search} />
        <input type="search" placeholder="Поиск" />
        <button onClick={handleEditModalOpen}>
          Создать <PlusOutlined className={styles.btn_plus} />
        </button>
        <img
          src={bell}
          alt="Error"
          width={52}
          className={styles.header__icon}
        />
      </div>
    </Layout.Header>
  );
};

export default MenuHeader;
