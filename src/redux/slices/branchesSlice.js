import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
    data_branches: []
}

const API = 'https://helsinki-backender.org.kg'

export const getBranches = createAsyncThunk('branches/getBranches', async () => {
    try {
        const response = await axios.get(`${API}/branches/`)
        return response
    } catch (error) {
        return error
    }
})

export const setBranchesProduct = createAsyncThunk('branches/setBranchesProduct', async ({ data, handleCloseModal }) => {
    try {
    const response = await axios.post(`${API}/branches/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
        handleCloseModal()
        return response
    } catch (error) {
        return error
    }
})

const branchesSlices = createSlice({
    name: 'branches',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBranches.fulfilled, (state, action) => {
            state.data_branches = action.payload
        })
        .addCase(setBranchesProduct.rejected, (state, action) => {
            toast.error('Продукт не добавлен!')
        })
        .addCase(setBranchesProduct.fulfilled, (state, action) => {
            toast.success('Продукт добавлен')
        })
    }
})

export default branchesSlices.reducer