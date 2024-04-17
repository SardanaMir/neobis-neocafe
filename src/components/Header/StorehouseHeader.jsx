import { PlusOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import searchIcon from '../../assets/img/Vector.svg'
import bell from '../../assets/img/Bell.svg'
import styles from './header.module.scss'
import { searchByName } from '../../redux/slices/itemsSlice';

const StorehouseHeader = ({ handleOpenNotificationComponent }) => {
  const storhouse = useSelector((state) => state.items.storhouse);
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: "addProductModal",
        modalProps: {},
      })
    );
  };

  const handleSearchByName = (e) => {
    const storehouse = e.target.value;
    dispatch(searchByName(storehouse))
  };

  return (
    <Layout.Header className={styles.header}>
        <h2>Склад</h2>
        <div className={styles.header__list}>
            <img src={searchIcon} alt="Error :(" className={styles.btn_search} />
            <input 
              type="search" 
              placeholder='Поиск' 
              value={storhouse}
              onChange={handleSearchByName}
            />
            <button onClick={handleOpenModal}>Создать <PlusOutlined className={styles.btn_plus} /></button>
            <img src={bell} alt="Error" width={52} className={styles.header__icon} onClick={handleOpenNotificationComponent}/>
        </div>
    </Layout.Header>
  )
};

export default StorehouseHeader;
