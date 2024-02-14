import React, { useState } from "react";
import { useFormik } from "formik";
import images from "../../assets/images.js";
import { basicSchema } from "../../schema";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice.js";
import CategoriesPopUp from "../../components/PopUp/CategoriesPopUp/index.jsx";
import styles from "./style.module.scss";

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
  const [isPopUpOpen, setPopUpOpen] = useState(false); // Состояние для отображения PopUp

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
        },
      })
    );
  };

  const handleDeleteCategory = () => {
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление",
          subtitle: "Вы действительно хотите удалить категорию “Чай” ?",
        },
      })
    );
  };

  const handleCategoryClick = () => {
    setPopUpOpen(!isPopUpOpen); // Переключение состояния отображения PopUp
  };
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {/* header таблицы */}
        <header className={styles.header}>
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
        </header>
        {/* тело таблицы */}
        {data.map((item, index) => (
          <div className={styles.itemWrapper} key={index}>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.ingredients}</p>
            <p>{item.price}</p>
            <p>{item.branch}</p>
            <img src={images.action} alt="действия" />
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
            handleCategoryClick={handleCategoryClick}
            setPopUpOpen={setPopUpOpen}
            handleOpenModal={handleOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
