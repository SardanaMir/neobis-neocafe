import React, { useState } from "react";
import { components } from "../../Buttons";
import { useFormik } from "formik";
import List from "../../List";
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

  const [checkboxesState, setCheckboxesState] = useState(
    new Array(weekday.length).fill(false)
  );
  const { values, errors, touched, isSubmitting, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        login: "",
        password: "",
        firstName: "",
        role: "",
        DOB: "",
        phoneNum: "",
        branch: "",
        workSchedule: "",
      },
      // validationSchema: basicSchema,
    });
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxesState];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxesState(updatedCheckboxes);
    console.log(checkboxesState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Редактирование</h2>
        <h3 className={styles.subtitle}>Личные данные</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.scrollableContent}>
            <p>Логин</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
              id="login"
              type="text"
            />
            <p>Пароль</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              id="password"
              type="text"
            />
            <p>Имя</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              id="firstName"
              type="text"
            />
            <p>Должность</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
              id="role"
              type="text"
            />
            <p>День рождения</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.DOB}
              id="DOB"
              type="text"
            />
            <p>Номер телефона</p>
            <input
              type="tel"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNum}
              id="phoneNum"
            />
            {/* <p>Филиал</p>
            <input type="text" />
            <p>Должность</p>
            <List />
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
            ))} */}
            <div className={styles.btnWrapper}>
              <components.WhiteButton title={"Отмена"} />
              <components.BlueButton
                title={"Сохранить"}
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
