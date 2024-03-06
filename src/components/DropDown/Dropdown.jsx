import { useState } from 'react';
import iconDown from '../../assets/img/CaretDown.svg'
import styles from "./dropdown.module.scss";

const DropdownStoreHouse = ({ category, setCategory }) => {
    const [isActive, setIsActive] = useState(false)

    const options  = ['Готовые продукты', 'Сырье']

  return (
    <div className={styles.dropdown}>
        <div 
            className={isActive ? styles.activeSelect : styles.dropdown_btn}
            onClick={e => setIsActive(!isActive)}
            >
                {category}
            <img src={iconDown} alt="Error :(" className={isActive ? styles.activeBtn : ''} />
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
                                setCategory(option)
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

export default DropdownStoreHouse;
