import { configureStore } from '@reduxjs/toolkit'
import modalSlice from '../slices/modalSlice';
import categoriesReducer from '../slices/categoriesSlice';
import userReducer from '../slices/userSlice';


export default configureStore({
    reducer : {
        modal: modalSlice,
        categories: categoriesReducer,
        user: userReducer
    }
});