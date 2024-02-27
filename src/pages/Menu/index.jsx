import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Header from "../../components/Header/Header.jsx";
import images from "../../assets/images.js";
import { basicSchema } from "../../schema";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice.js";
import CategoriesPopUp from "../../components/PopUp/CategoriesPopUp/index.jsx";
import styles from "./style.module.scss";
import EditDeletePopUp from "../../components/PopUp/EditDeletePopUp/index.jsx";
import { PlusOutlined } from "@ant-design/icons";
import bell from "../../assets/img/Bell.svg";
import searchIcon from "../../assets/img/Vector.svg";
import { Layout } from "antd";

const data = [
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Американо",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Американо",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Раф",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Раф",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Американо",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Капучино",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Раф",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
  {
    name: "Американо",
    category: "Кофе",
    ingredients: "кофе 10гр",
    price: "140 сом",
    branch: "Центральный",
  },
];

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const Menu = () => {
  const dispatch = useDispatch();
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const tableHead = [
    "Наименование",
    "Категория",
    "Состав блюд и граммовка",
    "Стоимость",
    "Филиал",
  ];

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: "addCategory",
        modalProps: {
          title: "Новая категория",
          subtitle: "Наименование",
          placeholder: "Введите название категории",
          action: "addCategory",
        },
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
        modalType: "editItem",
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
          title: "Удаление позиции",
          subtitle: `Вы действительно хотите удалить данную позицию?`,
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
        modalType: "addNewItem",
      })
    );
  };
  return (
    <>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          {/* header таблицы */}
          <div className={styles.theader}>
            {tableHead.map((name, index) => (
              <div
                key={index}
                className={
                  name === "Категория" || name === "Филиал" ? styles.flex : null
                }
                onClick={name === "Категория" ? handleCategoryClick : null}
              >
                <p>{name}</p>
                {(name === "Категория" || name === "Филиал") && (
                  <img
                    className={styles.arrowDown}
                    src={images.arrowDown}
                    alt="стрелка вниз"
                  />
                )}
              </div>
            ))}
          </div>
          {/* тело таблицы */}
          {data.map((item, index) => (
            <div className={styles.itemWrapper} key={index}>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.ingredients}</p>
              <p>{item.price}</p>
              <p>{item.branch}</p>
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
      </div>
    </>
  );
};

export default Menu;
