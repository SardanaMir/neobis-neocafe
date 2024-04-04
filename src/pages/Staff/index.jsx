import React, { useState, useEffect, useRef } from "react";
import images from "../../assets/images.js";
import { basicSchema } from "../../schema";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice.js";
import BranchesPopUp from "../../components/PopUp/BranchesPopUp";
import styles from "./styles.module.scss";
import EditDeletePopUp from "../../components/PopUp/EditDeletePopUp/index.jsx";
import { getAllStaff } from "../../api/index.js";
import { setStaffInfo } from "../../redux/slices/staffSlice.js";

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const Staff = () => {
  const dispatch = useDispatch();
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [idInfo, setIdInfo] = useState();
  const data = useSelector((state) => state.staff.staff);
  const branches = useSelector((state) => state.branches.data_branches.data);
  const staffData = data.map((obj) => {
    const branch = branches.find((branch) => branch.id === obj.branch);
    return  { ...obj, branchName: branch ? branch.name : "Филиал не найден" };
  });

  const tableHead = [
    "Имя",
    "Должность",
    "Логин",
    "Пароль",
    "Выберите филиал",
    "График работы",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffData = await getAllStaff();
        dispatch(setStaffInfo(staffData.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
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
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление сотрудника",
          subtitle: `Вы действительно хотите удалить данного сотрудника?`,
          action: "deleteStaff",
          id: idInfo,
        },
      })
    );
    // setActionsPopUpOpen(false)
  };
  const handleActionClick = (e) => {
    setPopupPosition({ x: e.clientX, y: e.clientY });
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
            {staffData.map((staff, index) => (
              <div className={styles.itemWrapper} key={staff.id}>
                <p>{staff.first_name}</p>
                <p>{staff.position}</p>
                <p>{staff.username}</p>
                <p>{staff.password}</p>
                <p>{staff.branchName}</p>
                <p>Пн, Вт, Ср, Чт</p>
                <img
                  className={styles.actionImg}
                  onClick={(e) => handleClick(staff.id, e)}
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
