import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { setAuthTokenToCookie } from "../../utils";
import * as yup from "yup";
import { login } from "../../api";
import LoginPage from "./LoginPage";
import { useDispatch } from "react-redux";

const LoginContainer = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    // e.preventDefault()
    const adminData = { username: values.username, password: values.password };
    console.log(adminData);
    try {
      const res = await login(adminData);
      dispatch(setUser(true))
      navigate("/menu");
      setError(false);
      setAuthTokenToCookie(res.access);
      console.log(res);
    } catch (err) {
      setError(true);
      console.error("Ошибка входа:", err);
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
