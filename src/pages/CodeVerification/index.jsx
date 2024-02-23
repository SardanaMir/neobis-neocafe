import React, {useState} from 'react'
import logo from '../../assets/img/neocafe-logo.png'
import bg from '../../assets/img/login-bg.jpg'
import OtpInput from 'react-otp-input';
import styles from './styles.module.scss'

const CodeVerification = () => {
  const [otp, setOtp] = useState();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(otp)
    
    if(isNaN(+otp)){
      setError(true)
      setErrorText('Код должен содержать только числа')
    }else{
      setError(false)
    }
    try{

    }catch(err){
      console.log(err)
      setErrorText('Код неверный, попробуйте ещё раз')
    }
  }
  const resendHandler = () =>{
    
  }
  return (
    <div className={styles.root}>
      <div>
        <img className={styles.logo} src={logo} alt="neocafe logo" />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>Код подтверждения</h2>
            {error ? (<p className={styles.errors}>{errorText}</p>):('')}
            <form className={styles.form} onSubmit={handleSubmit}>
            <OtpInput
              inputStyle={error ? styles.inputStyle : styles.inputStyleError}
              containerStyle={styles.containerStyle}
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} required/>}
              inputType
              skipDefaultStyles
            />
            <button type="submit" className={styles.btn}>Войти</button>
            </form>
            <p onClick={resendHandler} className={error ? styles.textErr : styles.text}>Отправить повторно</p>
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