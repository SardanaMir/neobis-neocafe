import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/slices/modalSlice.js";
import images from "../../../assets/images.js";
import styles from "./styles.module.scss";
import {
  setCategories,
  removeCategory,
} from "../../../redux/slices/categoriesSlice.js";

const CategoriesPopUp = ({ setPopUpOpen, handleOpenModal, data }) => {
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.categories.categories);

  const handleDeleteCategory = (index) => {
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление",
          subtitle: `Вы действительно хотите удалить категорию '${categoriesData[index].name}' ?`,
          category: categoriesData[index].name,
          action: "deleteCategory",
          id: categoriesData[index].id,
        },
      })
    );
    // dispatch(removeCategory(categoriesData[index].name));
  };

  const handleAdd = () => {
    console.log("вызов модалки добавить категорию");
    handleOpenModal();
  };
  return (
    <div className={styles.popup}>
      <div className={styles.popup__wrapper}>
        <div className={styles.popup__head}>
          <div className={styles.flex}>
            <div>Категория</div>
            <img
              onClick={() => setPopUpOpen(false)}
              src={images.arrowUp}
              alt="стрелка вверх"
            />
          </div>
        </div>
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className={styles.flex}
            onMouseEnter={() => setHighlightedCategory(index)}
            onMouseLeave={() => setHighlightedCategory(null)}
          >
            <p
              className={
                highlightedCategory === index ? styles.highlighted : ""
              }
            >
              {category.name}
            </p>
            {highlightedCategory === index && (
              <img
                onClick={() => handleDeleteCategory(index)}
                src={images.trash}
                alt="удалить"
              />
            )}
          </div>
        ))}
        <div>
          <div colSpan="2" className={styles.flex} onClick={handleAdd}>
            <button className={styles.add}>Добавить</button>
            <img src={images.plus} alt="плюс" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoriesPopUp;
