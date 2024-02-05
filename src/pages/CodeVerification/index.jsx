import React from 'react'
import logo from '../../assets/img/neocafe-logo.png'
import bg from '../../assets/img/login-bg.jpg'
import styles from './styles.module.scss'

const CodeVerification = () => {

  return (
    <div className={styles.root}>
      <div>
        <img className={styles.logo} src={logo} alt="neocafe logo" />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>Код подтверждения</h2>
            <form>
              <input type="text" />
              <button className={styles.btn}>Войти</button>
              <p className={styles.text}>Отправить повторно</p>
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

export default CodeVerification