import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { login } from "../../api";
import LoginPage from "./LoginPage";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';

const LoginContainer = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    const adminData = { username: values.username, password: values.password };
    // console.log(adminData);
    const formData = new FormData()
    formData.append('username', values.username)
    formData.append('password', values.password)

    try {
      Cookies.remove('accessToken')
      const res = await login(formData);
      console.log('successs', res)
      Cookies.set('accessToken', res?.access, { expires: 7 });
      dispatch(setUser(true))
      navigate("/menu");
      setError(false);
    } catch (err) {
      setError(true);
      console.log("Ошибка входа:", err);
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
