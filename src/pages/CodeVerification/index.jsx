import React, {useState} from 'react'
import logo from '../../assets/img/neocafe-logo.png'
import bg from '../../assets/img/login-bg.jpg'
import OtpInput from 'react-otp-input';
import styles from './styles.module.scss'

const CodeVerification = () => {
  const [otp, setOtp] = useState();
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(otp)
    try{

    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className={styles.root}>
      <div>
        <img className={styles.logo} src={logo} alt="neocafe logo" />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>Код подтверждения</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
            <OtpInput
              inputStyle={styles.inputStyle}
              containerStyle={styles.containerStyle}
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              inputType='number'
              skipDefaultStyles
            />
              <button type="submit" className={styles.btn}>Войти</button>
            </form>
            <p className={styles.text}>Отправить повторно</p>
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