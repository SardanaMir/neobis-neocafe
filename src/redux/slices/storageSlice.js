import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const API = 'https://helsinki-backender.org.kg'

const initialState = {
	data_storage: [],
	storage_product: [],
}

const token = Cookies.get('accessToken')
const config = {
	headers: {
		Authorization: `Bearer ${token}`,
	},
}

export const getProducts = createAsyncThunk('storage/getProducts', async () => {
	try {
		const response = await axios.get(`${API}/storage/`, config)
		return response.data
	} catch (error) {
		console.log(error)
	}
})

export const setProudct = createAsyncThunk('storage/setProudct', async data => {
	try {
		const { handleCloseModal, getNewProducts } = data
		const response = await axios.post(`${API}/storage/`, data)
		handleCloseModal()
		getNewProducts()
		return response.data
	} catch (error) {
		console.log(error)
	}
})

export const editProudct = createAsyncThunk(
	'storage/editProudct',
	async data => {
		try {
			const { id, handleCloseModal, getNewProducts } = data
			const response = await axios.patch(`${API}/storage/${id}/`, data)
			handleCloseModal()
			getNewProducts()
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

export const getOneProductById = createAsyncThunk(
	'storage/getOneProductById',
	async id => {
		try {
			const response = await axios.get(`${API}/storage/${id}/`, config)
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

export const deleteProduct = createAsyncThunk(
	'storage/deleteProduct',
	async ({ id, handleCloseModal, getStorageProduct }) => {
		try {
			const response = await axios.delete(`${API}/storage/${id}/`, config)
			handleCloseModal()
			getStorageProduct()
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

const storageSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {},
	extraReducers: builder => {
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
			.addCase(editProudct.rejected, (state, action) => {
				toast.error('Продукт не был изменён!')
			})
			.addCase(editProudct.fulfilled, (state, action) => {
				toast.warning('Продукт изменён')
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				toast.error('Продукт не был удалён!')
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				toast.warning('Продукт удалён')
			})
	},
})

export default storageSlice.reducer
