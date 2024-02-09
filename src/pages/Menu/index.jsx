import React from 'react'
import images from '../../assets/images.js'
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice.js';
import { useFormik } from 'formik';
import * as yup from "yup";
import styles from './style.module.scss'

const data = [
    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Американо",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },    {
        name: "Американо",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Раф",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Раф",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },    {
        name: "Американо",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },    
    {
        name: "Капучино",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },
    {
        name: "Раф",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    },    {
        name: "Американо",
        category: "Кофе",
        ingredients: "кофе 10гр",
        price: "140 сом",
        branch: "Центральный"
    }
]

const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
}

const Menu = () => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
      dispatch(openModal({
        modalType: 'addCategory',
        modalProps: {
          title: 'Новая категория',
          subtitle: 'Наименование',
          placeholder: 'Введите название категории',
        },
      }));
    };

    const handleDeleteCategory = () => {
        dispatch(openModal({
          modalType: 'deleteCategory',
          modalProps: {
          //   onChange: () => {},
            title: 'Удаление',
            subtitle: 'Вы действительно хотите удалить категорию “Чай” ?',
          },
        }));
    };
  return (
    <div className={styles.root}>
        <div className={styles.wrapper}>
            {/* header таблицы */}
            <header className={styles.header}>
                <p>Наименование</p>
                <div className={styles.flex}>
                    <p className={styles.category}>Категория</p>
                    <img src={images.arrowDown} alt="стрелка вниз" />
                </div>
                <div className={styles.flex}>
                    <p>Состав блюд и граммовка</p>
                    <img src={images.arrowDown} alt="стрелка вниз" />
                </div>
                <p>Стоимость</p>
                <p>Филиал</p>
            </header>
            {/* popup */}
            <div className={styles.popup}>
                <div className={styles.popupWrapper}>
                    <div className={styles.flex}>
                        <p>Категория</p>
                        <img src={images.arrowUp} alt="стрелка вверх" />
                    </div>
                    <div>Кофе</div>
                    <div>Выпечка</div>
                    <div>Коктейли</div>
                    <div>Десерты</div>
                    <div className={styles.flex}>
                        <div>Чай</div>
                        <img onClick={handleDeleteCategory} src={images.trash} alt="удалить" />
                    </div>
                    <div onClick={handleOpenModal} className={styles.flex}>
                        <div className={styles.add}>Добавить</div>
                        <img  src={images.plus} alt="плюс" />
                    </div>
                </div>
            </div>
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
        </div>
    </div>
  )
}

export default Menu