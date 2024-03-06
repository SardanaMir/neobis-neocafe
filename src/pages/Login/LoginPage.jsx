import React from "react";
import logo from "../../assets/img/neocafe-logo.png";
import bg from "../../assets/img/login-bg.jpg";
import eyeBlue from "../../assets/icons/eye_blue.svg";
import eyeSlash from "../../assets/icons/eye_slash.svg";
import styles from "./styles.module.scss";

const LoginPage = ({
  togglePasswordVisibility,
  passwordVisible,
  onSubmit,
  isSubmitting,
  handleBlur,
  handleChange,
  handleSubmit,
  values,
  error,
  errors,
  touched,
}) => {
  return (
    <div className={styles.root}>
      <div>
        <img className={styles.logo} src={logo} alt="neocafe logo" />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Вход</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className={error ? styles.error : styles.input}
                placeholder="Имя пользователя"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values && values.username}
                id="username"
                autoComplete="off"
              />
              {errors?.email && touched?.email && <p className={styles.errors}>{errors?.email}</p>}
              <div className={styles.passwordWrapper}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className={error ? styles.error : styles.input}
                  placeholder="Пароль"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values && values.password}
                  autoComplete="off"
                  id="password"
                  required
                />
                <img
                  onClick={togglePasswordVisibility}
                  className={styles.visible}
                  src={passwordVisible ? eyeBlue : eyeSlash}
                  alt="passwordVisible"
                />
              </div>
              {errors?.password && touched.password && (
                <p className={styles.errors}>{errors?.password}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting ? "disabled" : ""}
                className={styles.btn}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <img className={styles.img} src={bg} alt="3 cups of coffee" />
      </div>
    </div>
  );
};

export default LoginPage;
