import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/slices/modalSlice.js";
import images from "../../../assets/images.js";
import styles from "./styles.module.scss";

const CategoriesPopUp = ({
  setPopUpOpen,
  handleOpenModal,
}) => {
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const dispatch = useDispatch();

  const categories = ["Кофе", "Выпечка", "Коктейли", "Десерты", "Чай"];

  const handleDeleteCategory = (index) => {
    console.log("удалить позицию", index);
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление",
          subtitle: `Вы действительно хотите удалить категорию '${categories[index]}' ?`,
        },
      })
    );
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
        {categories.map((category, index) => (
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
