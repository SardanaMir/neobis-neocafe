import { configureStore } from '@reduxjs/toolkit'
import modalSlice from '../slices/modalSlice';
import categoriesReducer from '../slices/categoriesSlice';


export default configureStore({
    reducer : {
        modal: modalSlice,
        categories: categoriesReducer,
    }
});