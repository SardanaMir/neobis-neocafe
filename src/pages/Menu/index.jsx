import React, { useState, useEffect, useRef } from "react";
import images from "../../assets/images.js";
import { basicSchema } from "../../schema";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice.js";
import CategoriesPopUp from "../../components/PopUp/CategoriesPopUp/index.jsx";
import styles from "./style.module.scss";
import EditDeletePopUp from "../../components/PopUp/EditDeletePopUp/index.jsx";
import { getMenu, getAllCategories, getStock } from "../../api/index.js";
import {
  setCategories,
  setStock,
} from "../../redux/slices/categoriesSlice.js";
import { setItems } from "../../redux/slices/itemsSlice.js";
const data = [
  // {
  //   id: "item01",
  //   name: "Капучино",
  //   category: 2,
  //   ingredients: [
  //     {
  //       name: "Кофе",
  //       quantity: "10",
  //       measurement_unit: "гр",
  //     },
  //   ],
  //   price: 140,
  //   mealType: 'Сырье',
  //   currency: "сом",
  //   description:
  //     "классический напиток, который покорил сердца ценителей кофе по всему миру. Этот напиток известен своей простотой и в то же время насыщенным вкусом. Кофе Американо приготавливается путем добавления горячей воды к одному или двум эспрессо, что придает напитку более нежный вкус без утраты силы и аромата эспрессо.",
  // },
  // {
  //   id: "item02",
  //   name: "Раф",
  //   category: 2,
  //   ingredients: [
  //     {
  //       name: "Кофе",
  //       quantity: "15",
  //       measurement_unit: "гр",
  //     },
  //     {
  //       name: "Молоко",
  //       quantity: "100",
  //       measurement_unit: "мл",
  //     },
  //     {
  //       name: "Сироп",
  //       quantity: "20",
  //       measurement_unit: "мл",
  //     },
  //   ],
  //   price: 160,
  //   mealType: 'Сырье',
  //   currency: "сом",
  //   description: "Нежный напиток с молочной пенкой...",
  // },
  {
    id: "item03",
    name: "Латте",
    category: 2,
    mealType: 'Сырье',
    ingredients: [
      {
        name: "Кофе",
        quantity: "15",
        measurement_unit: "гр",
      },
      {
        name: "Молоко",
        quantity: "150",
        measurement_unit: "мл",
      },
    ],
    price: 150,
    currency: "сом",
    description: "Ароматный кофейный напиток с молоком...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
      },
    ],
    price: 120,
    currency: "сом",
    description: "Крепкий, насыщенный и ароматный кофейный напиток...",
  },
  {
    id: "item04",
    name: "Эспрессо",
    category: 2,
    mealType: 'Сырье',

    ingredients: [
      {
        name: "Кофе",
        quantity: "20",
        measurement_unit: "гр",
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
const categoriesData = [
  { name: "Кофе", id: "cat02" },
  { name: "Чай", id: "cat02" },
];
const Menu = () => {
  const dispatch = useDispatch();
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const searchResults = useSelector((state) => state.items.findedItems);
  const searchTerm = useSelector((state) => state.items.searchTerm);
  const items = useSelector((state) => state.items.items);
  const categories = useSelector((state) => state.categories.categories);
  console.log("menu cat", categories);
  const [idInfo, setIdInfo] = useState();
  const tableHead = [
    "№",
    "Наименование",
    "Категория",
    "Состав блюд и граммовка",
    "Стоимость",
  ];
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  // Заменяем id категории на название категории
  const updatedItems = items.map((item) => ({
    ...item,
    category: categoryMap[item.category], // Замена id на название категории
    currency: "сом",
  }));

  console.log("updatedItems", updatedItems);
  // Первичный рендер
  useEffect(() => {
    // dispatch(setItems(data))
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        dispatch(setCategories(categoriesData.data));
        const menuData = await getMenu();
        console.log("menuData", menuData.data);
        dispatch(setItems(menuData.data));
        const res = await getStock();
        console.log("storage", res.data);
        dispatch(setStock(res.data));
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
  const handleClick = (id, e) => {
    console.log("id", id);
    setIdInfo(id);
    handleActionClick(e);
  };
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
        modalProps: {
          id: idInfo,
        },
      })
    );
    setActionsPopUpOpen(false);
  };
  // const deleteItem = () =>{
  //   console.log('deleteItem in menu')
  // }
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
          id: idInfo,
          // handleDeleteModalOpen: deleteItem,
        },
      })
    );
    setActionsPopUpOpen(false);
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
          {searchTerm ? (
            <div className={styles.menuWrapper}>
              {searchResults.map((item, index) => (
                <div className={styles.itemWrapper} key={item.id}>
                  <p className={styles.numbering}>№{index + 1}</p>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>
                    {item.ingredients.map(
                      (ingredient, index) =>
                        ` ${ingredient.name} ${ingredient.quantity}${ingredient.measurement_unit};`
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
            </div>
          ) : (
            <div className={styles.menuWrapper}>
              {updatedItems.map((item, index) => (
                <div className={styles.itemWrapper} key={item.id}>
                  <p className={styles.numbering}>№{index + 1}</p>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>
                    {item.ingredients.map(
                      (ingredient, index) =>
                        ` ${ingredient.name} ${ingredient.quantity}${ingredient.measurement_unit};`
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
            </div>
          )}

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
