import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import { useFormik } from "formik";
import { changeStaffInfo, getAllStaff } from "../../../api";
import images from "../../../assets/images";
import styles from "./style.module.scss";
import { setStaffInfo } from "../../../redux/slices/staffSlice";

const EditEmployeeInfo = (props) => {
  const staffData = useSelector((state) => state.staff.staff);
  const staff = staffData.find((staff) => staff.id === props.id);
  const [selectedRole, setSelectedRole] = useState(staff.position);
  const ROLE = [
    { value: "Официант", label: "Официант" },
    { value: "Бармен", label: "Бармен" },
  ];
  const weekday = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [workSchedule, setWorkSchedule] = useState(staff.schedule);
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.data_branches.data);
  const BRANCH = branches.map((item) => ({
    value: item.name,
    label: item.name,
  }));
  const currentBranch = branches.filter((branch) => branch.id === staff.branch);
  const onSubmit = async (e) => {
    values.schedule = workSchedule;
    if (typeof values.branch === 'string'){
      const branchID = branches.filter((branch) => branch.name === values.branch);
      values.branch = branchID[0].id;
    }
    try {
      await changeStaffInfo(props.id, values);
      const staffData = await getAllStaff();
      dispatch(setStaffInfo(staffData.data))
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
      username: staff.username,
      password: staff.password,
      email: staff.email,
      first_name: staff.first_name,
      position: staff.position,
      birth_date: staff.birth_date,
      branch: staff.branch,
      schedule: staff.schedule,
    },
    // validationSchema: basicSchema,
    onSubmit: onSubmit,
  });

  const handleSelectRole = (selectedRole) => {
    values.position = selectedRole.value;
    setSelectedRole(selectedRole.value);
  };
  const handleSelectBranch = (selectedBranch) => {
    values.branch = selectedBranch.value;
  };
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleCheckboxChange = (day) => {
    setWorkSchedule((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
      [`${day}_start_time`]: prevState[day] ? "" : "",
      [`${day}_end_time`]: prevState[day] ? "" : "",
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setWorkSchedule((prevState) => ({
      ...prevState,
      [day]: true,
      [`${day}_${field}`]: value,
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
              defaultValue={selectedRole}
              onChange={(selectedOption) => handleSelectRole(selectedOption)}
              options={ROLE}
              placeholder={selectedRole}
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
              placeholder={currentBranch[0].name}
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
                    checked={workSchedule[day]}
                    onChange={() => handleCheckboxChange(day)}
                  />
                  <div className={styles.timeWrapper}>
                    <input
                      className={styles.timeInput}
                      type="time"
                      step="900"
                      min="09:00"
                      max="22:00"
                      value={workSchedule[`${day}_start_time`] || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "start_time", e.target.value)
                      }
                    ></input>
                    <span>-</span>
                    <input
                      className={styles.timeInput}
                      type="time"
                      step="900"
                      min="09:00"
                      max="22:00"
                      value={workSchedule[`${day}_end_time`] || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "end_time", e.target.value)
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

export default EditEmployeeInfo;
