import React, { useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import vertical from '../../assets/img/vertical.svg'
import styles from './affiliate.module.scss'
import CategoriesPopUp from '../PopUp/CategoriesPopUp';
import EditDeletePopUp from '../PopUp/EditDeletePopUp';
import DropDown from '../DropDown';
import DropdownStoreHouse from '../Dropdown/Dropdown';

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

const Affiliate = () => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch()

    
  const handleCategoryClick = () => {
    setPopUpOpen(!isPopUpOpen);
  };
  const handleActionClick = (e) => {
    setPopupPosition({ x: e.clientX, y: e.clientY });
    console.log(popupPosition);
    setActionsPopUpOpen(!isActionsPopUpOpen);
  };

  const handlePopUpClose = () => {
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

    const handleEditModalOpen = () => {
      console.log("edit modal open");
      dispatch(
        openModal({
          modalType: "editItem",
          modalProps: {},
        })
      );
      setActionsPopUpOpen(false);
    };

    const handleDeleteModalOpen = () => {
      console.log("delete modal open");
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

    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
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
                <img src={vertical} alt="Error :(" className={styles.listIcon} onClick={handleActionClick} />
            </tr>
          </tbody>
        </table>
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={data.length}
          className={styles.affiliate_pagination}
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

export default Affiliate;
