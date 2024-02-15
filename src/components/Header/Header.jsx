import { PlusOutlined } from '@ant-design/icons';
import bell from '../../assets/img/Bell.svg'
import searchIcon from '../../assets/img/Vector.svg'
import styles from './header.module.scss'


const Header = () => {
  return (
    <div className={styles.header}>
        <h2>Меню</h2>
        <div className={styles.header__list}>
            <img src={searchIcon} alt="Error :(" className={styles.btn_search} />
            <input type="search" placeholder='Поиск' />
            <button>Создать <PlusOutlined className={styles.btn_plus} /></button>
            <img src={bell} alt="Error" width={52} className={styles.header__icon} />
        </div>
    </div>
  )
};

export default Header;
