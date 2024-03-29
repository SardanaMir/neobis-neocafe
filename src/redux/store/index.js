import { configureStore } from '@reduxjs/toolkit'
import modalSlice from '../slices/modalSlice';
import categoriesReducer from '../slices/categoriesSlice';
import userReducer from '../slices/userSlice';
import storageReducer from '../slices/storageSlice'
import branchesReducer from '../slices/branchesSlice';
import itemsReducer from '../slices/itemsSlice';

export default configureStore({
    reducer : {
        modal: modalSlice,
        categories: categoriesReducer,
        user: userReducer,
        storage: storageReducer,
        branches: branchesReducer,
        items: itemsReducer,
    }
});