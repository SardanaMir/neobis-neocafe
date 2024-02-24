import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import vertical from '../../assets/img/vertical.svg'
import styles from './affiliate.module.scss'

const Affiliate = () => {
    const [current, setCurrent] = useState(3);
    const dispatch = useDispatch()
    
    const onChange = (page) => {
      console.log(page);
      setCurrent(page);
    };

    const handleOpenModal = () => {
      dispatch(
        openModal({
          modalType: "addAffiliateModal",
          modalProps: {},
        })
      );
    };
  
  
    return (
      <div className={styles.container}>
      <table className={styles.table}>
          <thead>
            <tr className={styles.affiliate_tr}>
            <span>№</span>
              <th className={styles.name_cafe} onClick={handleOpenModal}>Название кофейни</th>
              <th className={styles.address_th}>Адрес</th>
              <th className={styles.time_work_th}>Время работы</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
                <span>№1</span>
                  <td className={styles.name_cafe}>NeoCafe Dzerzhinka</td>
                  <td className={styles.address}>бульвар Эркиндик, 35 </td>
                  <td className={styles.time_work}>Каждый день с 11:00 до 22:00 </td>
                <img src={vertical} alt="Error :(" className={styles.listIcon} onClick={handleOpenModal} />
            </tr>
          </tbody>
        </table>
      </div>
    )
};

export default Affiliate;
