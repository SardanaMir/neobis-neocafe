import { configureStore } from '@reduxjs/toolkit'
import modalSlice from '../slices/modalSlice';
import categoriesReducer from '../slices/categoriesSlice';
import userReducer from '../slices/userSlice';
import itemsReducer from '../slices/itemsSlice';

export default configureStore({
    reducer : {
        modal: modalSlice,
        categories: categoriesReducer,
        user: userReducer,
        items: itemsReducer,
    }
});