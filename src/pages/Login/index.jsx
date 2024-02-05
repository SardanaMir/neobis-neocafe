import React from 'react'
import logo from '../../assets/img/neocafe-logo.png'
import bg from '../../assets/img/login-bg.jpg'
import { useFormik } from 'formik';
import styles from './styles.module.scss'

const Login = () => {

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
    <div className={styles.root}>
      <div>
        <img className={styles.logo} src={logo} alt="neocafe logo" />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Вход</h1>
            <form onSubmit={handleSubmit}>
              <input 
              type="email" 
              placeholder='Электронная почта' 
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              id='email'
              autoComplete='off' 
              required
              />
              <input 
              type="password" 
              placeholder='Пароль'
              onChange={handleChange} 
              onBlur={handleBlur}
              value={values.password}
              autoComplete='off' 
              id='password'
              required
              />
              <button type="submit" disabled={isSubmitting} className={styles.btn}>Отправить</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.box}>
        <img className={styles.img} src={bg} alt="2 cups of coffee" />
      </div>
    </div>
  )
}

export default Login