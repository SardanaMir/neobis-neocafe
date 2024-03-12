import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import images from "../../assets/images.js";
import { basicSchema } from "../../schema";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice.js";
import BranchesPopUp from "../../components/PopUp/BranchesPopUp";
import styles from "./styles.module.scss";
import EditDeletePopUp from "../../components/PopUp/EditDeletePopUp/index.jsx";

const data = [
  {
    name: "Мария",
    role: "Официант",
    login: "maria111",
    password: "qwerty",
    branch: "Центральный",
    schedule: "Пн, Вт, Ср, Чт",
  },
  // {
  //   email: "user@example.com",
  //   password: "string",
  //   first_name: "string",
  //   birth_date: "2024-03-08",
  //   branch: 0,
  //   position: "barista",
  //   schedule: {
  //       id: 0,
  //       title: "string",
  //       description: "string",
  //       monday: true,
  //       monday_start_time: "string",
  //       monday_end_time: "string",
  //       tuesday: true,
  //       tuesday_start_time: "string",
  //       tuesday_end_time: "string",
  //       wednesday: true,
  //       wednesday_start_time: "string",
  //       wednesday_end_time: "string",
  //       thursday: true,
  //       thursday_start_time: "string",
  //       thursday_end_time: "string",
  //       friday: true,
  //       friday_start_time: "string",
  //       friday_end_time: "string",
  //       saturday: true,
  //       saturday_start_time: "string",
  //       saturday_end_time: "string",
  //       sunday: true,
  //       sunday_start_time: "string",
  //       sunday_end_time: "string"
  //   }
  // }
];

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const Staff = () => {
  const dispatch = useDispatch();
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [idInfo, setIdInfo] = useState();

  const tableHead = [
    "Имя",
    "Должность",
    "Логин",
    "Пароль",
    "Выберите филиал",
    "График работы",
  ];

  const handleCategoryClick = () => {
    setPopUpOpen(!isPopUpOpen);
  };

  const handlePopUpClose = () => {
    setActionsPopUpOpen(false);
  };
  const handleEditModalOpen = () => {
    dispatch(
      openModal({
        modalType: "editEmployeeInfo",
        modalProps: {
          id: idInfo,
        },
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
          title: "Удаление сотрудника",
          subtitle: `Вы действительно хотите удалить данного сотрудника?`,
          action: "deleteItem",
          id: idInfo,
        },
      })
    );
    // setActionsPopUpOpen(false)
  };
  const handleActionClick = (e) => {
    setPopupPosition({ x: e.clientX, y: e.clientY });
    console.log(popupPosition);
    setActionsPopUpOpen(!isActionsPopUpOpen);
  };
  const handleClick = (id, e) => {
    setIdInfo(id);
    handleActionClick(e);
  };

  return (
    <>
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
          <div className={styles.menuWrapper}>
            {data.map((item, index) => (
              <div className={styles.itemWrapper} key={index}>
                <p>{item.name}</p>
                <p>{item.role}</p>
                <p>{item.login}</p>
                <p>{item.password}</p>
                <p>{item.branch}</p>
                <p>{item.schedule}</p>
                <img
                  className={styles.actionImg}
                  onClick={(e) => handleClick(item.id, e)}
                  src={images.action}
                  alt="действия"
                />
              </div>
            ))}
          </div>
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
