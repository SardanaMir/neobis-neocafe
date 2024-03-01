import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import { getCookie, setCookie } from "../../utils";
import { setAuthTokenToCookie } from "../../utils";
import * as yup from "yup";
import { login } from "../../api";
import LoginPage from "./LoginPage";

const LoginContainer = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // const basicSchema = yup.object().shape({
  //   email: yup.string().email("Введите e-mail").required("Введите e-mail"),

  //   password: yup
  //     .string()
  //     .min(5, "Минимум 5 символов")
  //     .required("Введите пароль"),
  // });

  const onSubmit = async (e) => {
    // e.preventDefault()
    const adminData = { username: values.username, password: values.password };
    console.log(adminData);
    try {
      const res = await login(adminData);
      setAuthTokenToCookie(res.access);
      navigate("/menu");
      setError(false);
      console.log(res);
    } catch (err) {
      setError(true);
    }
  };
  const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    // validationSchema: basicSchema,
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);

  };
  return (
    <LoginPage
      passwordVisible={passwordVisible}
      togglePasswordVisibility={togglePasswordVisibility}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
      error={error}
      errors={errors}
      touched={touched}
    />
  );
};

export default LoginContainer;
