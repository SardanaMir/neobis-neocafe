import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Header from "../../components/Header/Header.jsx";
import images from "../../assets/images.js";
import { basicSchema } from "../../schema";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice.js";
import BranchesPopUp from "../../components/PopUp/BranchesPopUp";
import styles from "./styles.module.scss";
import EditDeletePopUp from "../../components/PopUp/EditDeletePopUp/index.jsx";
import { PlusOutlined } from "@ant-design/icons";
import bell from "../../assets/img/Bell.svg";
import searchIcon from "../../assets/img/Vector.svg";
import { Layout } from "antd";
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

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const Staff = () => {
  const dispatch = useDispatch();
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const tableHead = [
    "Имя",
    "Должность",
    "Логин",
    "Пароль",
    "Выберите филиал",
    "Телефон",
    "График работы",
  ];

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: "addNewEmployee",
        // modalProps: {
        //   title: "Новая категория",
        //   subtitle: "Наименование",
        //   placeholder: "Введите название категории",
        //   action: "addCategory",
        // },
      })
    );
  };

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
  const handleEditModalOpen = () => {
    console.log("edit modal open");
    dispatch(
      openModal({
        modalType: "addNewEmployee",
        modalProps: {
          // title: "Новая категория",
          // subtitle: "Наименование",
          // placeholder: "Введите название категории",
        },
      })
    );
    setActionsPopUpOpen(false);
  };
  //удалить позицию из меню
  const handleDeleteModalOpen = () => {
    console.log("delete modal open");
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление сотрудника",
          subtitle: `Вы действительно хотите удалить данного сотрудника?`,
          action: "deleteItem",
        },
      })
    );
    // setActionsPopUpOpen(false)
  };
  const handleOpenProductModal = (e) => {
    console.log(e.target);
    dispatch(
      openModal({
        modalType: "addNewEmployee",
      })
    );
  };
  return (
    <>
      <Layout.Header className={styles.header}>
        <h2>Сотрудники</h2>
        <div className={styles.header__list}>
          <img src={searchIcon} alt="Error :(" className={styles.btn_search} />
          <input type="search" placeholder="Поиск" />
          <button onClick={handleOpenProductModal}>
            Создать <PlusOutlined className={styles.btn_plus} />
          </button>
          <img
            src={bell}
            alt="Error"
            width={52}
            className={styles.header__icon}
          />
        </div>
      </Layout.Header>{" "}
      <div className={styles.root}>
        <div className={styles.wrapper}>
          {/* header таблицы */}
          <header className={styles.theader}>
            {tableHead.map((name, index) => (
              <div
                key={index}
                className={
                  name === "Выберите филиал" || name === "Филиал"
                    ? styles.flex
                    : null
                }
                onClick={
                  name === "Выберите филиал" ? handleCategoryClick : null
                }
              >
                <p>{name}</p>
                {(name === "Выберите филиал" || name === "Филиал") && (
                  <img
                    className={styles.arrowDown}
                    src={images.arrowDown}
                    alt="стрелка вниз"
                  />
                )}
              </div>
            ))}
          </header>
          {/* тело таблицы */}
          {data.map((item, index) => (
            <div className={styles.itemWrapper} key={index}>
              <p>{item.name}</p>
              <p>{item.role}</p>
              <p>{item.login}</p>
              <p>{item.password}</p>
              <p>{item.branch}</p>
              <p>{item.phoneNumber}</p>
              <p>{item.schedule}</p>
              <img
                className={styles.actionImg}
                onClick={handleActionClick}
                src={images.action}
                alt="действия"
              />
            </div>
          ))}
          {/* пагинация */}
          <div className={styles.pagination}>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={data.length}
            />
          </div>
          {/* Всплывающее окно для категорий */}
          {isPopUpOpen && (
            <BranchesPopUp
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
      </div>
    </>
  );
};

export default Staff;
