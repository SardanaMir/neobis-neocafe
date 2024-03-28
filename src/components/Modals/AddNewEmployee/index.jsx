import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import { useFormik } from "formik";
import { createNewStaff, getBranches } from "../../../api";
import images from "../../../assets/images";
import styles from "./style.module.scss";

const AddNewEmployee = () => {
  const ROLE = [
    { value: "Официант", label: "Официант" },
    { value: "Бармен", label: "Бармен" },
  ];
  const BRANCH = [
    { value: "NeoCafe Dzerzhinka-1", label: "NeoCafe Dzerzhinka-1" },
    { value: "NeoCafe Dzerzhinka-2", label: "NeoCafe Dzerzhinka-2" },
    { value: "NeoCafe Dzerzhinka-3", label: "NeoCafe Dzerzhinka-3" },
    { value: "NeoCafe Dzerzhinka-4", label: "NeoCafe Dzerzhinka-4" },
  ];
  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [workSchedule, setWorkSchedule] = useState({});
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState("");

  function transformData(data) {
    let schedule = {title:'neocafe',};
    // Устанавливаем по умолчанию для всех дней false
    const daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    daysOfWeek.forEach((day) => {
      schedule[day] = false;
      schedule[`${day}_start_time`] = null;
      schedule[`${day}_end_time`] = null;
    });

    data.forEach((dayInfo, index) => {
      const day = Object.keys(dayInfo)[0];
      schedule[day.toLowerCase()] = true;
      schedule[`${day.toLowerCase()}_start_time`] = dayInfo[day][0].start;
      schedule[`${day.toLowerCase()}_end_time`] = dayInfo[day][1].end;
    });

    return schedule;
  }

  const onSubmit = async (e) => {
    const response = await getBranches();
    console.log(response);
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

    const changeDataStructure = transformData(finalWorkSchedule);
    values.schedule = changeDataStructure;
    console.log("values", values);
    try {
      const res = await createNewStaff(values);
      console.log(res);
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      first_name: "",
      position: "",
      birth_date: "",
      branch: 2,
      schedule: {title:'neocafe',},
    },
    // validationSchema: basicSchema,
    onSubmit: onSubmit,
  });

  const handleSelectRole = (selectedRole) => {
    console.log(selectedRole);
    values.position = selectedRole.value;
    setSelectedRole(selectedRole.value);
  };
  const handleSelectBranch = (selectedBranch) => {
    console.log(selectedBranch);
    values.branch = selectedBranch.value;
  };
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleCheckboxChange = (index, e) => {
    setWorkSchedule((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
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

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <>
          <div>
            <h2 className={styles.title}>Новый сотрудник</h2>
            <div className={styles.close} onClick={handleClose}>
              &times;
            </div>
          </div>
          <h3 className={styles.subtitle}>Личные данные</h3>
          <form onSubmit={handleSubmit}>
            <p>Должность</p>
            <Select
              defaultValue={""}
              onChange={(selectedOption) => handleSelectRole(selectedOption)}
              options={ROLE}
              placeholder={"Выберите должность"}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  background: "rgb(235, 239, 242)",
                  boxShadow: state.isFocused
                    ? "0px solid #ccc"
                    : "0px solid #ccc",
                  boxShadow: "none !import",
                  borderStyle: "none",
                  fontSize: 14,
                }),
                menu: (provided) => ({
                  ...provided,
                  borderStyle: "none",
                  background: "rgb(235, 239, 242)",
                  fontSize: 14,
                }),
                option: (provided) => ({
                  ...provided,
                  background: "rgb(235, 239, 242)",
                  color: "rgb(42, 52, 64)",
                  borderBottom: "1px solid rgb(205, 211, 221)",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                width: 252,
                height: 60,
                colors: {
                  ...theme.colors,
                  primary25: "rgb(53, 83, 107)",
                  primary: "rgb(53, 83, 107)",
                },
              })}
            />
            <p>Имя</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
              id="first_name"
              type="text"
              placeholder="Как зовут сотрудника"
            />
            <p className="label">Электронная почта</p>
            <input
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              id="email"
              placeholder="Введите e-mail"
            />
            {selectedRole === "Официант" && (
              <>
                <p>Логин</p>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  id="username"
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
              </>
            )}

            <p for="birthday">День рождения</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.birth_date}
              id="birth_date"
              type="date"
              placeholder="01.01.2000"
            />

            <p>Филиал</p>
            <Select
              defaultValue={""}
              onChange={(selectedOption) => handleSelectBranch(selectedOption)}
              options={BRANCH}
              placeholder={"Выберите филиал"}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  background: "rgb(235, 239, 242)",
                  boxShadow: state.isFocused
                    ? "0px solid #ccc"
                    : "0px solid #ccc",
                  boxShadow: "none !import",
                  borderStyle: "none",
                  fontSize: 14,
                }),
                menu: (provided) => ({
                  ...provided,
                  borderStyle: "none",
                  background: "rgb(235, 239, 242)",
                  fontSize: 14,
                }),
                option: (provided) => ({
                  ...provided,
                  background: "rgb(235, 239, 242)",
                  color: "rgb(42, 52, 64)",
                  borderBottom: "1px solid rgb(205, 211, 221)",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                width: 252,
                height: 60,
                colors: {
                  ...theme.colors,
                  primary25: "rgb(53, 83, 107)",
                  primary: "rgb(53, 83, 107)",
                },
              })}
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
              <button
                className={styles.cancelBtn}
                type="button"
                onClick={handleClose}
              >
                Отмена
              </button>
              <button
                className={styles.confirmBtn}
                disabled={isSubmitting}
                type="submit"
              >
                Сохранить
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default AddNewEmployee;
