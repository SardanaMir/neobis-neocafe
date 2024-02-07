import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";
import { closeModal } from '../../../redux/slices/modalSlice';
import styles from './style.module.scss'

const AddCategoryModal = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const handleOpenModal = () => {
    dispatch(closeModal());
  };

  const basicSchema = yup.object().shape({
    newCategory: yup
    .string()
    .min(5, 'Минимум 5 букв')
    .max(100, "Максимум 100 букв")
    .required("Введите категорию")
  });

  const onSubmit = () =>{
    console.log(values.newCategory)
    try{
      // setError(true)
    }catch(err){
      setError(true)
    }
  }
  
  const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues: {
    newCategory: "",
    },
    onSubmit,
    validationSchema: basicSchema
  });

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        <div onClick={handleOpenModal} class={styles.close}>&times;</div>
        <h3 className={styles.subtitle}>{props.subtitle}</h3>
        <form onSubmit={handleSubmit}>
          <input 
          className={styles.input} 
          type="text" 
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Введите название категории'
          value={values.newCategory}
          id='new category'
          autoComplete='off' 
          />
          <div className={styles.flex}>
            <button className={styles.btnCancel}>Отмена</button>
            <button type="submit" disabled={isSubmitting} className={styles.btnAdd}>Добавить</button>
          </div>
        </form>
      </div>
      {console.log('render add category', props)}
    </div>
  )
}

export default AddCategoryModal