import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.isAuth = action.payload
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;