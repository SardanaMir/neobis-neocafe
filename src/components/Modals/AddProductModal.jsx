import { useDispatch } from 'react-redux'
import { CloseOutlined } from "@ant-design/icons";
import { closeModal } from '../../redux/slices/modalSlice';
import { StorehouseModalPrimaryButton, StorehouseModalWhiteButton } from "../Buttons/Buttons";
import styles from '../../styles/add_product.modal.module.scss'
import { Select } from 'antd';
import InputMask from 'react-input-mask';


const AddProductModal = () => {
    const dispatch = useDispatch()

    const handleCloseModal = () => {
      dispatch(closeModal())
    }

    
    const options = [
      { value: 'мл', label: 'мл' },
      { value: 'г', label: 'г' },
      { value: 'кг', label: 'кг' },
      { value: 'ш', label: 'ш' },
      { value: 'л', label: 'л' },
    ];
    const formatChars = {
      'P': '[PK]',
      '0': '[02468]'
    };

  const optionsAddProductCategory = [
    { value: 'готовая продукция', label: <p className={styles.labels}>Готовая продукция</p>},
    { value: 'сырье', label: <p className={styles.labels}>Сырье</p>}
  ]

    const handleChange = (value) => {
      console.log(value);
    };
    const handleChangeCategory = (value) => {
      console.log(value);
    }

    



    const defaultValue = options[0];

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
                <Select
                style={{border: 'none', background: 'red'}}
                  defaultValue={{
                    value: 'мл',
                    label: 'мл',
                  }}
                  className={styles.selectDown}
                  onChange={handleChange}
                  options={options}
                />
              </div>
            </div>
            <div className={styles.add__product_category}>
              <span className={styles.category__span}>Категория</span>
              <Select
                  defaultValue={{
                    value: 'Выберите категорию',
                    label: 'Выберите категорию',
                  }}
                  className={styles.category}
                  onChange={handleChangeCategory}
                  options={optionsAddProductCategory}
                />
            </div>
            <div className={styles.add__product_limit}>
              <span className={styles.limit_span}>Минимальный лимит</span>
              <input type="text" placeholder='Например: 2 кг' />
            </div>
            <div className={styles.add__product_date}>
              <span className={styles.data_span}>Дата прихода</span>
              {/* <input type="number" placeholder='' /> */}
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
            <StorehouseModalWhiteButton>Отмена</StorehouseModalWhiteButton>
            <StorehouseModalPrimaryButton>Сохранить</StorehouseModalPrimaryButton>
        </div>
        </div>
    </div>
  )
};

export default AddProductModal;
