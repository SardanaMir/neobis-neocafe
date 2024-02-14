import React, { useState } from "react";
import images from "../../../assets/images.js";
import styles from "./styles.module.scss";
const CategoriesPopUp = () => {
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const categories = ["Кофе", "Выпечка", "Коктейли", "Десерты", "Чай"];
  const handleDeleteCategory = () => {
    console.log("удалить позицию");
  };
  const handleAdd = () =>{
    console.log('вызов модалки добавить категорию')
  }
  return (
    <div className={styles.popup}>
      <div className={styles.popupWrapper}>
        <div className={styles.flex}>
          <p>Категория</p>
          <img src={images.arrowUp} alt="стрелка вверх" />
        </div>
        {categories.map((category, index) => (
          <div
            key={index}
            className={styles.flex}
            onMouseEnter={() => setHighlightedCategory(index)}
            onMouseLeave={() => setHighlightedCategory(null)}
          >
            <p className={highlightedCategory === index ? styles.highlighted : ""}>{category}</p>

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
