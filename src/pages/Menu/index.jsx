import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Header from "../../components/Header/Header.jsx";
import images from "../../assets/images.js";
import { basicSchema } from "../../schema";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice.js";
import CategoriesPopUp from "../../components/PopUp/CategoriesPopUp/index.jsx";
import styles from "./style.module.scss";
import EditDeletePopUp from "../../components/PopUp/EditDeletePopUp/index.jsx";
import { PlusOutlined } from "@ant-design/icons";
import { getMenu, getAllCategories } from "../../api/index.js";
import bell from "../../assets/img/Bell.svg";
import searchIcon from "../../assets/img/Vector.svg";
import { Layout } from "antd";
import {
  setCategories,
  removeCategory,
} from "../../redux/slices/categoriesSlice.js";
import {
  setItems,
} from "../../redux/slices/itemsSlice.js";
const data = [
  {
    id: 'item01',
    name: "Капучино",
    category: "Кофе",
    ingredients: [
      {
        name: "Кофе",
        quantity: "10",
        measure: "гр",
      },
    ],
    price: 140,
    currency: "сом",
    description:
      "классический напиток, который покорил сердца ценителей кофе по всему миру. Этот напиток известен своей простотой и в то же время насыщенным вкусом. Кофе Американо приготавливается путем добавления горячей воды к одному или двум эспрессо, что придает напитку более нежный вкус без утраты силы и аромата эспрессо.",
  },
  {
    id: 'item02',
    name: "Раф",
    category: "Кофе",
    ingredients: [
      {
        name: "Кофе",
        quantity: "15",
        measure: "гр",
      },
      {
        name: "Молоко",
        quantity: "100",
        measure: "мл",
      },
      {
        name: "Сироп",
        quantity: "20",
        measure: "мл",
      },
    ],
    price: 160,
    currency: "сом",
    description: "Нежный напиток с молочной пенкой...",
  },
  {
    id: 'item03',
    name: "Латте",
    category: "Кофе",
    ingredients: [
      {
        name: "Кофе",
        quantity: "15",
        measure: "гр",
      },
      {
        name: "Молоко",
        quantity: "150",
        measure: "мл",
      },
    ],
    price: 150,
    currency: "сом",
    description: "Ароматный кофейный напиток с молоком...",
  },
  {
    id: 'item04',
    name: "Эспрессо",
    category: "Кофе",
    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measure: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
];

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const categoriesData = [{name: 'Кофе', id: "cat02"}, {name: 'Чай', id: "cat02"}]
const Menu = () => {
  const dispatch = useDispatch();
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const items = useSelector(state => state.items.items);
  const [idInfo, setIdInfo] = useState()
  const tableHead = [
    "№",
    "Наименование",
    "Категория",
    "Состав блюд и граммовка",
    "Стоимость",
  ];

  // Первичный рендер
  useEffect(() => {
    dispatch(setItems(data))

    const fetchData = async () => {
      try {
        // const categoriesData = await getAllCategories();
        dispatch(setCategories(categoriesData));
        console.log("getAllCategories", categoriesData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = async () => {
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
  const handleClick = (id, e) =>{
    console.log('id', id);
    setIdInfo(id)
    handleActionClick(e)
  }
  const handleCategoryClick = () => {
    setPopUpOpen(!isPopUpOpen);
  };
  const handleActionClick = (e) => {
    setPopupPosition({ x: e.clientX, y: e.clientY });
    console.log({ x: e.clientX, y: e.clientY });
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
      })
    );
    setActionsPopUpOpen(false);
  };
  //удалить позицию из меню
  const handleDeleteModalOpen = (id) => {
    console.log("delete modal open");
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление позиции",
          subtitle: `Вы действительно хотите удалить данную позицию?`,
          action: "deleteItem",
          id: idInfo
        },
      })
    );
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
                  name === "Категория" || name === "Филиал"
                    ? styles.flex
                    : name === "№"
                    ? styles.numbering
                    : null
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
          {items.map((item, index) => (
            <div className={styles.itemWrapper} key={item.id}>
              <p className={styles.numbering}>№ {index + 1}</p>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {item.ingredients.map(
                  (ingredient, index) =>
                    ` ${ingredient.name} ${ingredient.quantity}${ingredient.measure};`
                )}
              </p>
              <p>
                {item.price} {item.currency}
              </p>
              <img
                className={styles.actionImg}
                // onClick={handleActionClick}
                onClick={(e) => handleClick(item.id, e)}
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
