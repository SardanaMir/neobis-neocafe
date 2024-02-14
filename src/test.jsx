import React, { useState } from 'react';
import styles from './styles.module.scss';

const Categories = () => {
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const categories = ['Кофе', 'Выпечка', 'Коктейли', 'Десерты', 'Чай'];

  const handleDeleteCategory = (index) => {
    console.log('удалить позицию', categories[index]);
  };

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
            className={`${styles.flex} ${highlightedCategory === index ? styles.highlighted : ''}`}
            onMouseEnter={() => setHighlightedCategory(index)}
            onMouseLeave={() => setHighlightedCategory(null)}
          >
            <p>{category}</p>

            {highlightedCategory === index && (
              <img
                onClick={() => handleDeleteCategory(index)}
                src={images.trash}
                alt="удалить"
              />
            )}
          </div>
        ))}
        <div className={styles.flex}>
          <div className={styles.add}>Добавить</div>
          <img src={images.plus} alt="плюс" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
