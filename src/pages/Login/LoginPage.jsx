import React from 'react'
import logo from '../../assets/img/neocafe-logo.png'
import bg from '../../assets/img/login-bg.jpg'
import styles from './styles.module.scss'

const LoginPage = ({onSubmit, isSubmitting, handleBlur, handleChange, handleSubmit, values}) => {
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
              value={values && values.email}
              id='email'
              autoComplete='off' 
              required
              />
              <input 
              type="password" 
              placeholder='Пароль'
              onChange={handleChange} 
              onBlur={handleBlur}
              value={values && values.password}
              autoComplete='off' 
              id='password'
              required
              />
              <button type="submit" disabled={isSubmitting ? "disabled" : ""} className={styles.btn}>Отправить</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.box}>
        <img className={styles.img} src={bg} alt="3 cups of coffee" />
      </div>
    </div>
  )
}

export default LoginPage