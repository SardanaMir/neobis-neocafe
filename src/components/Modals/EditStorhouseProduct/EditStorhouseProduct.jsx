import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { CloseOutlined } from "@ant-design/icons";
import InputMask from 'react-input-mask';
import Select from 'react-select'
import { closeModal } from '../../../redux/slices/modalSlice';
import { StorehouseModalPrimaryButton, StorehouseModalWhiteButton } from "../../Buttons/Buttons";
import DropdownStoreHouse from '../../DropDown/Dropdown';
import DropDownCount from '../../DropDown/DropDownCount';
import { getProducts, setProudct, editProudct } from '../../../redux/slices/storageSlice';
import DropDownLimit from '../../DropDown/DropDownLimit';
import { getOneProductById } from '../../../redux/slices/storageSlice'
import { getBranches, setBranchesProduct } from '../../../redux/slices/branchesSlice';
import styles from '../../../styles/add_product_modal.module.scss'


const EditStorhouseProduct = ({ id }) => {  
  const { data } = useSelector(state => state.branches.data_branches)
  const { storage_product } = useSelector(state => state.storage)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(null)
  const [quantity_unit, setQuantityUnit] = useState('')
  const [limit, setLimit] = useState(null)
  const [limit_unit, setLimitUnit] = useState('')
  const [arrival_date, setArrivalDate] = useState('')
  const [category, setCategory] = useState('')
  const [branch, setBranch] = useState(null)  
  
  useEffect(() => {
    setName(storage_product.name)
    setQuantity(storage_product.quantity)
    setQuantityUnit(storage_product.quantity_unit)
    setLimit(storage_product.limit)
    setLimitUnit(storage_product.limit_unit)
    setArrivalDate(storage_product.arrival_date)
    setCategory(storage_product.category)
    setBranch(storage_product.branch)
  }, [storage_product, ]);


  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const handleSelectIngredient = (value) => {
    setBranch(value.value)
  }

  const getNewProducts = () => {
    dispatch(getProducts())
  }

  const handleEditProduct = () => {
    dispatch(editProudct({ id, name, quantity, quantity_unit, limit, limit_unit, arrival_date, category, branch, handleCloseModal, getNewProducts }))
  }


  useEffect(() => {
    dispatch(getBranches())
  }, [])

  const options = data?.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }))


  useEffect(() => {
    dispatch(getOneProductById(id))
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.add__product}>
          <p className={styles.add__product_h3}>Редактирование<CloseOutlined className={styles.add__product_icon} onClick={handleCloseModal} /></p>
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
                mask='99.99.9999'
                placeholder='MM.DD.YYYY'
                value={arrival_date}
                onChange={(e) => setArrivalDate(e.target.value)}
              >
              </InputMask>
            </div>
            <div className={styles.add__product_affiliate}>
              <span className={styles.affiliate_span}>Филиал</span>
              <Select
                defaultValue={branch}
                onChange={handleSelectIngredient}
                options={options}
                placeholder="Выберите филиал"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    background: "rgb(235, 239, 242)",
                    width: 252,
                    height: 66,
                    boxShadow: state.isFocused
                      ? "0px solid #ccc"
                      : "0px solid #ccc",
                    boxShadow: "none !import",
                    borderStyle: "none",
                    fontSize: 16,
                  }),
                  menu: (provided) => ({
                    width: 252,
                    height: 100,
                    maxHeight: 66,
                    borderStyle: "none",
                    background: "rgb(235, 239, 242)",
                    fontSize: 16,
                    overflow: scroll
                  }),
                  option: (provided) => ({
                    width: 100,
                    height: 100,
                    maxHeight: 40,
                    ...provided,
                    background: "rgb(235, 239, 242)",
                    color: "rgb(42, 52, 64)",
                    borderBottom: "1px solid rgb(205, 211, 221)",
                    display: "flex",
                    alignItems: "center",
                    fontSize: 16,
                    overflow: scroll,
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 10,
                  width: 252,
                  height: 66,
                  colors: {
                    ...theme.colors,
                    primary25: "rgb(53, 83, 107)",
                    primary: "rgb(53, 83, 107)",
                  },
                })}
              />
            </div>
          </div>
          <div className={styles.btns}>
            <StorehouseModalWhiteButton onClick={handleCloseModal}>Отмена</StorehouseModalWhiteButton>
            <StorehouseModalPrimaryButton onClick={handleEditProduct}>Сохранить</StorehouseModalPrimaryButton>
        </div>
        </div>
    </div>
  )
};

export default EditStorhouseProduct;