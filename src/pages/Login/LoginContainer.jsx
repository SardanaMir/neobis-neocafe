import React from 'react'
import { useFormik } from 'formik';
import LoginPage from './LoginPage'

const LoginContainer = () => {

    const onSubmit = async () =>{
        console.log(values.email, values.password)
        try{
            
        }catch(err){
          console.log('error')
        }
    }
    const {
        values,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
        email: "",
        password: "",
        },
        onSubmit,
    });

  return (
    <LoginPage 
    onSubmit={onSubmit} 
    isSubmitting={isSubmitting} 
    handleBlur={handleBlur}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    values={values}
    />
  )
}

export default LoginContainer