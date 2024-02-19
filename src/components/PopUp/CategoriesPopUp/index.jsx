import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/slices/modalSlice.js";
import images from "../../../assets/images.js";
import styles from "./styles.module.scss";
import { setCategories, removeCategory } from "../../../redux/slices/categoriesSlice.js";

const CategoriesPopUp = ({
  setPopUpOpen,
  handleOpenModal,
  data
}) => {
  console.log('CategoriesPopUp', data)
  const categoriesArr = ["Кофе", "Выпечка", "Коктейли", "Десерты", "Чай"];

  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const dispatch = useDispatch();
  const categoriesData = useSelector(state => state.categories.categories)

  useEffect(() => {
    if (!categoriesData.length) {
      dispatch(setCategories(categoriesArr));
    }
  }, []);

  const handleDeleteCategory = (index) => {
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление",
          subtitle: `Вы действительно хотите удалить категорию '${categoriesData[index]}' ?`,
          category: categoriesData[index],
          action: 'deleteCategory'
        },
      })
    );
    dispatch(removeCategory(categoriesData[index]))
  };

  const handleAdd = () => {
    console.log("вызов модалки добавить категорию");
    handleOpenModal();
  };
  return (
    <div className={styles.popup}>
      <div className={styles.popupWrapper}>
        <div className={styles.categoryWrapper}>
          <p>Категория</p>
          <img
            className={styles.arrowUp}
            onClick={() => setPopUpOpen(false)}
            src={images.arrowUp}
            alt="стрелка вверх"
          />
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
              {category}
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
        <div className={styles.flex} onClick={handleAdd}>
          <div className={styles.add}>Добавить</div>
          <img src={images.plus} alt="плюс" />
        </div>
      </div>
    </div>
  );
};
export default CategoriesPopUp;
