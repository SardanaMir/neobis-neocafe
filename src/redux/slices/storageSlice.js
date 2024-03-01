
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'https://helsinki-backender.org.kg'

const initialState = {
    data_storage: [],
    storage_product: [], 
};


export const getProducts = createAsyncThunk('storage/getProducts', async () => {
  try {
    const response = await axios.get(`${API}/storage/`);
    return response.data;
  } catch (error) {
    return error
  }
});

export const setProudct = createAsyncThunk('storage/setProudct', async (data) => {
  try {
    const { handleCloseModal } = data
    const response = await axios.post(`${API}/storage/`, data);
    handleCloseModal()
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getOneProductById = createAsyncThunk('storage/getOneProductById', async (id) => {
  try {
    const response = await axios.get(`${API}/storage/${id}/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setProudct.rejected, (state, action) => {
        toast.error('Продукт не добавлен!')
      })
      .addCase(setProudct.fulfilled, (state, action) => {
        toast.success('Продукт добавлен')
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data_storage = action.payload
      })
      .addCase(getOneProductById.fulfilled, (state, action) => {
        state.storage_product = action.payload
      })
  }
  
});

export default storageSlice.reducer;