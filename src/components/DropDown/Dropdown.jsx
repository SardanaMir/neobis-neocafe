import { useState } from 'react';
import iconDown from '../../assets/img/CaretDown.svg'
import styles from "./dropdown.module.scss";

const DropdownStoreHouse = ({ selected, setSelected }) => {
    const [isActive, setIsActive] = useState(false)

    const options  = ['Готовая продукция', 'Сырье']

  return (
    <div className={styles.dropdown}>
        <div 
            className={isActive ? styles.activeSelect : styles.dropdown_btn}
            onClick={e => setIsActive(!isActive)}
            >
                {selected}
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
                                setSelected(option)
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
