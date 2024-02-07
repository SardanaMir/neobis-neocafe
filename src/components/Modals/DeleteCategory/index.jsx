import React from 'react'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/slices/modalSlice';
import styles from './style.module.scss';

const DeleteCategory = (props) => {
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
            <div className={styles.flex}>
                <button className={styles.btnCancel}>Да</button>
                <button className={styles.btnAdd}>Нет</button>
            </div>
        </div>
    </div>  
    )
}

export default DeleteCategory