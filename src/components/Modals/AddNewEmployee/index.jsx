import React, { useState } from "react";
import { components } from "../../Buttons";
import List from '../../List'
import styles from "./style.module.scss";

const AddNewEmployee = () => {

  const weekday = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const [checkboxesState, setCheckboxesState] = useState(new Array(weekday.length).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxesState];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxesState(updatedCheckboxes);
    console.log(checkboxesState)
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Редактирование</h2>
        <h3 className={styles.subtitle}>Личные данные</h3>
        <form>
          {/* <p>Логин</p>
          <input type="text" />
          <p>Пароль</p>
          <input className={styles.textarea} type="textarea" />
          <p>Имя</p>
          <input type="text" />
          <p>Должность</p>
          <input type="text" />
          <p>День рождения</p>
          <input type="text" />
          <p>Номер телефона</p>
          <input type="text" />
          <p>Филиал</p>
          <input type="text" /> */}
          <List/>
          <h3 className={styles.subtitle}>График работы</h3>
          <div className={styles.flex}>
            <h4>День недели</h4>
            <h4>Время работы</h4>
          </div>
          {weekday.map((day, index) => (
            <>
              <div className={styles.dayWrapper} key={index}>
                <h4>{day}</h4>
                <input 
                className={styles.checkbox} 
                type="checkbox" 
                checked={checkboxesState[index]}
                onChange={() => handleCheckboxChange(index)}
                />
                <div className={styles.timeWrapper}>
                  <input
                    className={styles.timeInput}
                    type="time"
                    step="900"
                    min="09:00"
                    max="18:00"
                    defaultValue="11:00"
                  ></input>
                  <span>-</span>
                  <input
                    className={styles.timeInput}
                    type="time"
                    step="900"
                    min="09:00"
                    max="18:00"
                    defaultValue="20:00"
                  ></input>
                </div>
              </div>
            </>
          ))}
          <div className={styles.btnWrapper}>
            <components.WhiteButton title={"Отмена"} />
            <components.BlueButton title={"Сохранить"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
