import React from 'react'
import { useDispatch } from 'react-redux';

import styles from './style.module.scss'
import { closeModal } from '../../../redux/slices/modalSlice';

const AddCategoryModal = (props) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        <div onClick={handleOpenModal} class={styles.close}>&times;</div>
        <h3 className={styles.subtitle}>{props.subtitle}</h3>
        <form>
          <input className={styles.input} type="text" placeholder='Введите название категории'/>
          <div className={styles.flex}>
            <button className={styles.btnCancel}>Отмена</button>
            <button className={styles.btnAdd}>Добавить</button>
          </div>
        </form>
      </div>
      {console.log('render add category', props)}
    </div>
  )
}

export default AddCategoryModal