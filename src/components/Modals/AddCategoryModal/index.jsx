import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { basicSchema } from '../../../schema';
import { closeModal } from '../../../redux/slices/modalSlice';
import { values, isSubmitting, handleBlur, handleChange, handleSubmit, errors, touched } from '../../../FormFile';
import styles from './style.module.scss'

const AddCategoryModal = (props) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    basicSchema.validate(values.newCategory, { abortEarly: false })
    .then(() => {
      console.log('Валидация успешна');
      dispatch(closeModal());
      //добавить новую категорию
    })
    .catch(errors => {
      console.log('Ошибки валидации:', errors);
    });
  };
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
          placeholder={props.placeholder}
          value={values.newCategory}
          id='single input'
          autoComplete='off' 
          />
          <div className={styles.flex}>
            <button className={styles.btnCancel}>Отмена</button>
            <button type="submit" disabled={isSubmitting} className={styles.btnAdd}>Добавить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategoryModal