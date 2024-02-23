import { PlusOutlined } from '@ant-design/icons';
import bell from '../../assets/img/Bell.svg'
import searchIcon from '../../assets/img/Vector.svg'
import styles from './header.module.scss'
import { Layout } from 'antd';
import { openModal } from '../../redux/slices/modalSlice';
import { useDispatch } from 'react-redux';


const Header = () => {
  const dispatch = useDispatch()

  const handleOpenProductModal = (e) => {
    console.log(e.target)
    dispatch(openModal({
      modalType: 'addProductModal'
    }))
  }
  return (
    <Layout.Header className={styles.header}>
        <h2>Меню</h2>
        <div className={styles.header__list}>
            <img src={searchIcon} alt="Error :(" className={styles.btn_search} />
            <input type="search" placeholder='Поиск' />
            <button onClick={handleOpenProductModal}>Создать <PlusOutlined className={styles.btn_plus} /></button>
            <img src={bell} alt="Error" width={52} className={styles.header__icon} />
        </div>
    </Layout.Header>
  )
};

export default Header;
