import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { CloseOutlined } from "@ant-design/icons";
import { closeModal } from '../../../redux/slices/modalSlice';
import { StorehouseModalPrimaryButton, StorehouseModalWhiteButton } from "../../Buttons/Buttons";
import styles from '../../../styles/add_product.modal.module.scss'
import { Select } from 'antd';
import InputMask from 'react-input-mask';
import DropdownStoreHouse from '../../Dropdown/Dropdown';
import DropDownCount from '../../DropDown/DropDownCount';


const AddProductModal = () => {
  const [selected, setSelected] = useState('Выберите категорию')
  const [selectedCount, setSelectedCount] = useState('мл')
    const dispatch = useDispatch()

    const handleCloseModal = () => {
      dispatch(closeModal())
    }


  return (
    <div className={styles.container}>
        <div className={styles.add__product}>
          <h3 className={styles.add__product_h3}>Новая продукция <CloseOutlined className={styles.add__product_icon} onClick={handleCloseModal} /></h3>
          <p className={styles.add__product_p}>Наименование, категория и стоимость</p>
          <div className={styles.add__product_name}>
            <span>Наименование</span>
            <input type="text" placeholder='Введите название продукции' />
          </div>
          <div className={styles.add__product_inps}>
            <div className={styles.add__product_count}>
              <span className={styles.count_span}>Кол-во (в гр, мл, л, кг)</span>
              <div className={styles.select}>
                <input type="number" placeholder='Количество' />
                <DropDownCount selectedCount={selectedCount} setSelectedCount={setSelectedCount} />
              </div>
            </div>
            <div className={styles.add__product_category}>
              <span className={styles.category__span}>Категория</span>
                <DropdownStoreHouse selected={selected} setSelected={setSelected} />
            </div>
            <div className={styles.add__product_limit}>
              <span className={styles.limit_span}>Минимальный лимит</span>
              <input type="text" placeholder='Например: 2 кг' />
            </div>
            <div className={styles.add__product_date}>
              <span className={styles.data_span}>Дата прихода</span>
              <InputMask
                mask='99.99.9999'
                placeholder='dd.mm.yyyy'>
              </InputMask>
            </div>
            <div className={styles.add__product_affiliate}>
              <span className={styles.affiliate_span}>Филиал</span>
              <input type="text" />
            </div>
          </div>
          <div className={styles.btns}>
            <StorehouseModalWhiteButton onClick={handleCloseModal}>Отмена</StorehouseModalWhiteButton>
            <StorehouseModalPrimaryButton>Сохранить</StorehouseModalPrimaryButton>
        </div>
        </div>
    </div>
  )
};

export default AddProductModal;
