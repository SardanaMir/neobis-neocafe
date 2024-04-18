import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


const initialState = {
    data_branches: [],
    branch: [],
}

const API = 'https://helsinki-backender.org.kg'

export const getBranches = createAsyncThunk('branches/getBranches', async () => {
    try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(`${API}/branches/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        toast.error(error.message)
    }
})

export const getBranchById = createAsyncThunk('branches/getBranchById', async (id) => {
    try {
        const response = await axios.get(`${API}/branches/${id}/`)
        return response
    } catch (error) {
        toast.error(error.message)
    }
})

export const setBranchesProduct = createAsyncThunk('branches/setBranchesProduct', async ({ formData, handleCloseModal, handleGetBranches }) => {
    try {
    const response = await axios.post(`${API}/branches/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        handleGetBranches()
        handleCloseModal()
        return response
    } catch (error) {
        console.log(error);
    }
})

export const editBranch = createAsyncThunk('branches/setBranchesProduct', async ({ id, formData, handleCloseModal, handleGetBranches }) => {
    try {
    const response = await axios.patch(`${API}/branches/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        handleGetBranches()
        handleCloseModal()
        return response
    } catch (error) {
        console.log(error);
    }
})

export const deleteBranch = createAsyncThunk('branches/deleteBranch', async ({ id, handleCloseModal, getLastUpdateBranches }) => {
    try {
        const response = await axios.delete(`${API}/branches/${id}/`)
        getLastUpdateBranches()
        handleCloseModal()
        return response
    } catch (error) {
        console.log(error);
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
        .addCase(deleteBranch.rejected, (state, action) => {
            toast.error('Продукт не удалён!')
        })
        .addCase(deleteBranch.fulfilled, (state, action) => {
            toast.warning('Продукт удалён')
        })
        .addCase(getBranchById.fulfilled, (state, action) => {
            state.branch = action.payload
        })
    }
})

export default branchesSlices.reducer