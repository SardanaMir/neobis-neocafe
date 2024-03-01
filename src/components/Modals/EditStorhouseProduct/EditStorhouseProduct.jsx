import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { CloseOutlined } from "@ant-design/icons";
import { Select } from 'antd';
import InputMask from 'react-input-mask';
import { closeModal } from '../../../redux/slices/modalSlice';
import { StorehouseModalPrimaryButton, StorehouseModalWhiteButton } from "../../Buttons/Buttons";
import DropdownStoreHouse from '../../Dropdown/Dropdown';
import DropDownCount from '../../DropDown/DropDownCount';
import { getOneProductById } from '../../../redux/slices/storageSlice';
import DropDownLimit from '../../DropDown/DropDownLimit';
import styles from '../../../styles/add_product.modal.module.scss'


const EditStorhouseProduct = ({ id }) => {  
  const { storage_product } = useSelector(state => state.storage)
  const dispatch = useDispatch()

  const [name, setName] = useState(storage_product.name)
  const [quantity, setQuantity] = useState(storage_product.quantity)
  const [quantity_unit, setQuantityUnit] = useState(storage_product.quantity_unit)
  const [limit, setLimit] = useState(storage_product.limit)
  const [limit_unit, setLimitUnit] = useState(storage_product.limit_unit)
  const [arrival_date, setArrivalDate] = useState(storage_product.arrival_date)
  const [category, setCategory] = useState(storage_product.category)
  const [branch, steBranch] = useState(storage_product.branch)  


  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  useEffect(() => {
    dispatch(getOneProductById(id))
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.add__product}>
          <h3 className={styles.add__product_h3}>Редактирование<CloseOutlined className={styles.add__product_icon} onClick={handleCloseModal} /></h3>
          <p className={styles.add__product_p}>Наименование, категория и стоимость</p>
          <div className={styles.add__product_name}>
            <span>Наименование</span>
            <input 
              type="text" 
              placeholder='Введите название продукции' 
              value={name}
              onChange={(e) => setName(e.target.value) }
            />
          </div>
          <div className={styles.add__product_inps}>
            <div className={styles.add__product_count}>
              <span className={styles.count_span}>Кол-во (в гр, мл, л, кг)</span>
              <div className={styles.select}>
                <input 
                  type="number" 
                  placeholder='Количество' 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <DropDownCount quantity_unit={quantity_unit} setQuantityUnit={setQuantityUnit} />
              </div>
            </div>
            <div className={styles.add__product_category}>
              <span className={styles.category__span}>Категория</span>
                <DropdownStoreHouse category={category} setCategory={setCategory} />
            </div>
            <div className={styles.add__product_count}>
              <span className={styles.limit_span}>Минимальный лимит</span>
              <div className={styles.select}>
                <input 
                  type="number" 
                  placeholder='Например: 2 кг' 
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
                <DropDownLimit limit_unit={limit_unit} setLimitUnit={setLimitUnit} />
              </div>
            </div>
            <div className={styles.add__product_date}>
              <span className={styles.data_span}>Дата прихода</span>
              <InputMask
                mask='9999-99-99'
                placeholder='YYYY-MM-DD'
                value={arrival_date}
                onChange={(e) => setArrivalDate(e.target.value)}
              >
              </InputMask>
            </div>
            <div className={styles.add__product_affiliate}>
              <span className={styles.affiliate_span}>Филиал</span>
              <input 
                type="text" 
                onChange={(e) => steBranch(e.target.value)}
              />
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

export default EditStorhouseProduct;

