import React, { useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MoreOutlined } from '@ant-design/icons';
import vertical from '../../assets/img/vertical.svg'
import { openModal } from '../../redux/slices/modalSlice';
import styles from './storehouse.module.scss'
import EditDeletePopUp from '../PopUp/EditDeletePopUp';
import CategoriesPopUp from '../PopUp/CategoriesPopUp';

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


const FinishingProducts = () => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  
  const { data_storage } = useSelector(state => state.storage)

  const dispatch = useDispatch()

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const handleCategoryClick = () => {
    setPopUpOpen(!isPopUpOpen);
  };

  const handleActionClick = (e) => {
    setPopupPosition({ x: e.clientX, y: e.clientY });
    setActionsPopUpOpen(!isActionsPopUpOpen);
  };

  const handlePopUpClose = () => {
    setActionsPopUpOpen(false);
  };

  const handleDeleteModalOpen = () => {
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление позиции",
          subtitle: `Вы действительно хотите удалить данную позицию?`,
          action: "deleteItem",
        },
      })
    );
  };

  const handleEditModalOpen = () => {
    dispatch(
      openModal({
        modalType: "editStorhouseProduct",
        modalProps: {},
      })
    );
    setActionsPopUpOpen(false);
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
        <tbody>
            <tr className={styles.list_product}>
              <td><span>№1</span>Капучино</td>
              <td>20 шт</td>
              <td>10 шт</td>
              <td>20.09.2024</td>
              <td>
                NeoCafe Ala-Too Square 
                <img src={vertical} alt="Error :(" className={styles.tableIcon} onClick={handleActionClick} />
              </td>
            </tr>
        </tbody>
      </table>
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={100}
        className={styles.pagination}
      />
      {isPopUpOpen && (
        <CategoriesPopUp
          setPopUpOpen={setPopUpOpen}
          handleOpenModal={handleOpenModal}
        />
      )}
      {isActionsPopUpOpen && (
        <EditDeletePopUp
          x={popupPosition.x}
          y={popupPosition.y}
          closePopUp={handlePopUpClose}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
        />
      )}
    </div>
  )
};

export default FinishingProducts;
