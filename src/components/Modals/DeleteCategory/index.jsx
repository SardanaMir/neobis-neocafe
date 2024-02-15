import React from 'react'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/slices/modalSlice';
import {components} from '../../Buttons'
import styles from './style.module.scss';
import { removeCategory } from '../../../redux/slices/categoriesSlice';

const DeleteCategory = (props) => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };
    const deleteCategory = () =>{
        console.log('удалить категорию')
        dispatch(removeCategory(props.category))
        dispatch(closeModal());
    }
    const deleteItem = () =>{
        console.log('удалить позицию');
        dispatch(closeModal());

    }

    const actions = {
        deleteCategory: deleteCategory,
        deleteItem: deleteItem,
    };

    const handleClick = actions[props.action];

  return (
    <div className={styles.root}>
        <div className={styles.wrapper}>
            <h2 className={styles.title}>{props.title}</h2>
            <div onClick={handleCloseModal} className={styles.close}>&times;</div>
            <h3 className={styles.subtitle}>{props.subtitle}</h3>
            <div className={styles.flex}>
                <components.WhiteButton title={'Да'} handleClick={handleClick}/>
                <components.BlueButton title={'Нет'} handleCloseModal={handleCloseModal}/>
            </div>
        </div>
    </div>  
    )
}

export default DeleteCategory