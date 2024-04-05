import { useState } from 'react';
import Select from 'react-select';
import iconDown from '../../assets/img/CaretDown.svg'
import styles from "./dropdown.module.scss";

const DropDownLimit = ({ limit_unit, setLimitUnit }) => {
    const [isActive, setIsActive] = useState(false)
    const options  = ['мл', 'г', 'кг', 'шт', 'л']

  return (
    <div className={styles.dropdown_count}>
        <div 
            className={isActive ? styles.activeSelect : styles.dropdown_btn}
            onClick={e => setIsActive(!isActive)}
            >
                {limit_unit}
            <img src={iconDown} alt="Error :(" width={22} className={isActive ? styles.activeBtn : ''} />
        </div>
        {
            isActive && (
            <div className={styles.dropdown_content}>
                {
                    options.map((option, index) => (
                        <div 
                            key={index}
                            className={styles.dropdown_item} 
                            onClick={e => {
                                setLimitUnit(option)
                                setIsActive(false)
                            }}
                        > 
                            {option}
                        </div>
                    ))
                }
            </div>
            )
        }
    </div>
  )
};

export default DropDownLimit;