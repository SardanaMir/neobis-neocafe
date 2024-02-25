import React, { useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import vertical from '../../assets/img/vertical.svg'
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import styles from './storehouse.module.scss'


const data = [
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    phoneNumber: "+70001112233",
    schedule: "Пн, Вт, Ср, Чт",
  },
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    phoneNumber: "+70001112233",
    schedule: "Пн, Вт, Ср, Чт",
  },
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    phoneNumber: "+70001112233",
    schedule: "Пн, Вт, Ср, Чт",
  },
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    phoneNumber: "+70001112233",
    schedule: "Пн, Вт, Ср, Чт",
  },
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    phoneNumber: "+70001112233",
    schedule: "Пн, Вт, Ср, Чт",
  },
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    phoneNumber: "+70001112233",
    schedule: "Пн, Вт, Ср, Чт",
  },
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    phoneNumber: "+70001112233",
    schedule: "Пн, Вт, Ср, Чт",
  },
];


const RawMaterials = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({
      modalType: 'addAffiliateModal',
      modalProps: {
      //   onChange: () => {},
        title: 'Новая категория',
        subtitle: 'Наименование',
      },
    }));
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  return (
    <div className={styles.con}>
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
              <td>25 шт</td>
              <td>10 шт</td>
              <td>20.09.2024</td>
              <td>NeoCafe Ala-Too Square <img src={vertical} alt="Error :(" className={styles.tableIcon} onClick={handleOpenModal}/></td>
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
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={data.length}
        className={styles.pagination}
      />
    </div>
  )
};

export default RawMaterials;
