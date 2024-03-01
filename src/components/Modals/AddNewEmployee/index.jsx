import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { components } from "../../Buttons";
import { closeModal } from "../../../redux/slices/modalSlice";
import { useFormik } from "formik";
// import List from "../../List";
import images from "../../../assets/images";
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
  const role = ["Бармен", "Официант"];
  const branches = [
    "NeoCafe Dzerzhinka",
    "NeoCafe Karpinka",
    "NeoCafe Karpinka",
    "NeoCafe Ala-Too  Square",
  ];

  const [workSchedule, setWorkSchedule] = useState({});
  const dispatch = useDispatch();

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
        workSchedule: [],
      },
      // validationSchema: basicSchema,
    });

  // Функция обработки изменений в расписании работы
  const handleCheckboxChange = (index) => {
    setWorkSchedule((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalWorkSchedule = weekday.reduce((acc, day) => {
      if (workSchedule[day]) {
        acc.push({
          [day]: [
            { start: workSchedule[day].start || "09:00" },
            { end: workSchedule[day].end || "18:00" },
          ],
        });
      }
      return acc;
    }, []);
    console.log("Расписание работы после submit:", finalWorkSchedule);
    values.workSchedule = finalWorkSchedule;
    console.log(values);
  };

  const handleRoleSelect = (selectedRole) => {
    console.log(selectedRole);
    handleChange("role")(selectedRole);
    handleChange("branch")(selectedRole);
  };
  const handleTimeChange = (day, field, value) => {
    setWorkSchedule((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [field]: value,
      },
    }));
  };
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.title}>Новый сотрудник</h2>
          <div className={styles.close} onClick={handleClose}>
            &times;
          </div>
        </div>
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
              placeholder="Придумайте логин"
              minLength={5}
            />
            <p>Пароль</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              id="password"
              type="text"
              placeholder="Придумайте пароль"
            />
            <p>Имя</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              id="firstName"
              type="text"
              placeholder="Как зовут сотрудника"
            />
            <p>Должность</p>
            {/* <List
              options={role}
              values={"Выберите должность"}
              onSelect={handleRoleSelect}
            /> */}
            <p for="birthday">День рождения</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.DOB}
              id="DOB"
              // type="date"
              placeholder="01.01.2000"
            />
            <label className="label">Номер телефона</label>
            <input
              type="tel"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNum}
              id="phoneNum"
              placeholder="Введите номер телефона"
              pattern="\+996\d{3}\d{6}"
            />
            <p>Филиал</p>
            <List
              options={branches}
              values={"Выберите филиал"}
              onSelect={handleRoleSelect}
            />

            <h3 className={styles.subtitle}>График работы</h3>
            <div className={styles.divider}></div>
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
                    checked={workSchedule[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <div className={styles.timeWrapper}>
                    <input
                      className={styles.timeInput}
                      type="time"
                      step="900"
                      min="09:00"
                      max="22:00"
                      defaultValue="11:00"
                      value={workSchedule[day]?.start || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "start", e.target.value)
                      }
                    ></input>
                    <span>-</span>
                    <input
                      className={styles.timeInput}
                      type="time"
                      step="900"
                      min="09:00"
                      max="22:00"
                      defaultValue="20:00"
                      value={workSchedule[day]?.end || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "end", e.target.value)
                      }
                    ></input>
                  </div>
                </div>
              </>
            ))}
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
