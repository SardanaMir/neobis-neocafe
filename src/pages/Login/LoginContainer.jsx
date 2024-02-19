import React, { useState } from 'react'
import { useFormik } from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import * as yup from "yup";
import {login} from '../../api'
import LoginPage from './LoginPage'

const LoginContainer = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const basicSchema = yup.object().shape({
    email: yup
    .string()
    .email("Введите e-mail")
    .required("Введите e-mail"),
  
    password: yup
    .string()
    .min(5, 'Минимум 5 символов')
    .required("Введите пароль"),
  });

  const onSubmit = async () =>{
    const adminData = {"username": values.email, "password": values.password}
    console.log(data)
    try{
      const res = await login(adminData)
      navigate('/');
      console.log(res) 
    }catch(err){
      setError(true)
    }
  }
  const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues: {
    email: "",
    password: "",
    },
    onSubmit,
    validationSchema: basicSchema
  });
    
  return (
    <LoginPage 
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
  )
}

export default LoginContainer