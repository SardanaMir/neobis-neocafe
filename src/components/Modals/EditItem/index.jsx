import React from "react";
import DropDown from "../../DropDown";
import { components } from "../../Buttons";

import styles from "./style.module.scss";

const EditItem = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Редактирование</h2>
        <h3 className={styles.subtitle}>Добавьте фото к позиции</h3>
        {/* <div className={styles.upload}>upload</div> */}
        <h3 className={styles.subtitle}>Наименование, категория и стоимость</h3>
        <form>
          <p>Наименование</p>
          <input type="text" />
          <p>Описание</p>
          <input className={styles.textarea} type="textarea" />
          <div className={styles.flex}>
            <div>
              <p>Категория</p>
              <DropDown name={"Выберите категорию"} />
            </div>
            <div>
              <p>Стоимость</p>
              <input className={styles.priceInput} type="text" />
            </div>
            {/* <input type="text" placeholder='сом'/> */}
          </div>

          <h3 className={styles.subtitle}>Добавьте фото к позиции</h3>
          <div className={styles.flex}>
            <div>
              <p>Наименование</p>
              <input className={styles.priceInput} type="text" />
            </div>
            <div>
              <p>Кол-во (в гр, мл, л, кг)</p>
              <div className={styles.flex}>
                <input className={styles.priceInput} type="text" />
                <DropDown name={"мл"} />
              </div>
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <components.WhiteButton
              title={"Отмена"}
            />
            <components.BlueButton title={"Сохранить"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
