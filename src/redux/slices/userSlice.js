import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: true,
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