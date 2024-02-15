import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import vertical from '../../assets/img/vertical.svg'
import styles from './affiliate.module.scss'

const Affiliate = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
      console.log(page);
      setCurrent(page);
    };
    return (
      <div className={styles.container}>
      <table className={styles.table}>
          <thead>
            <tr className={styles.first_tr}>
              <th><span>№</span>Название кофейни</th>
              <th>Адрес</th>
              <th>Время работы</th>
            </tr>
          </thead>
          <hr className={styles.table_line}/>
          <tbody>
              <tr>
                <td><span>№1</span>NeoCafe Dzerzhinka</td>
                <td>бульвар Эркиндик, 35</td>
                <td>Каждый день с 11:00 до 22:00 <img src={vertical} alt="Error :(" className={styles.tableIcon}/></td>
              </tr>
                <hr className={styles.list_line} />
            <tr>
                <td><span>№1</span>NeoCafe Dzerzhinka</td>
                <td>бульвар Эркиндик, 35</td>
                <td>Каждый день с 11:00 до 22:00 <img src={vertical} alt="Error :(" className={styles.tableIcon}/></td>
              </tr>
            <hr className={styles.list_line} />
          </tbody>
        </table>
      </div>
    )
};

export default Affiliate;
