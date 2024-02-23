import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import vertical from '../../assets/img/vertical.svg'
import styles from './storehouse.module.scss'

const RawMaterials = () => {
  const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <>
    <table className={styles.table}>
        <thead>
          <tr className={styles.first_tr}>
            <th><span>№</span>Наименование</th>
            <th>Количество</th>
            <th>Лимит</th>
            <th>Дата прихода</th>
            <th>Филиал</th>
          </tr>
        </thead>
        <hr className={styles.table_line}/>
        <tbody>
            <tr>
              <td><span>№1</span>Капучино</td>
              <td>20 шт</td>
              <td>10 шт</td>
              <td>20.09.2024</td>
              <td>NeoCafe Ala-Too Square <img src={vertical} alt="Error :(" className={styles.tableIcon}/></td>
            </tr>
          <hr className={styles.list_line} />
          <tr>
              <td><span>№1</span>Капучино</td>
              <td>20 шт</td>
              <td>10 шт</td>
              <td>20.09.2024</td>
              <td>NeoCafe Ala-Too Square <img src={vertical} alt="Error :(" className={styles.tableIcon}/></td>
            </tr>
          <hr className={styles.list_line} />
        </tbody>
      </table>
    </>
  )
};

export default RawMaterials;
