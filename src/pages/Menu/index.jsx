import React from 'react'
import images from '../../assets/images.js'
import { Pagination } from 'antd';
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
    const handleOpenModal = () => openModal({
        name: 'addCategory', 
        props:{
            onChange: () => {},
            title: 'Добавить категорию'
    }})

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
                        <img src={images.trash} alt="удалить" />
                    </div>
                    <div className={styles.flex}>
                        <div className={styles.add}>Добавить</div>
                        <img src={images.plus} alt="плюс" />
                    </div>
                </div>
            </div>
            {/* тело таблицы */}
            {data.map(item => (
            <div className={styles.itemWrapper}>
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