import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import searchIcon from "../../assets/img/Vector.svg";
import { Layout } from "antd";
import bell from "../../assets/img/Bell.svg";
import { openModal } from "../../redux/slices/modalSlice.js";
import styles from "./header.module.scss";

const StaffHeader = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: "addNewEmployee",
      })
    );
  };
  return (
    <Layout.Header className={styles.header}>
      <h2>Сотрудники</h2>
      <div className={styles.header__list}>
        <img src={searchIcon} alt="Error :(" className={styles.btn_search} />
        <input type="search" placeholder="Поиск" />
        <button onClick={handleOpenModal}>
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

export default StaffHeader;
