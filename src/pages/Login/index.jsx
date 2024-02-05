import React from 'react'
import logo from '../../assets/img/neocafe-logo.png'
import bg from '../../assets/img/login-bg.jpg'
import styles from './styles.module.scss'

const Login = () => {

  return (
    <div className={styles.root}>
      <div>
        <img className={styles.logo} src={logo} alt="neocafe logo" />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Вход</h1>
            <form>
              <input type="email" placeholder='Электронная почта'/>
              <input type="password" placeholder='Пароль'/>
              <button className={styles.btn}>Отправить</button>
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