import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: true,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            if(action.payload.token){
                state.isAuth = true;
            }else{
                state.isAuth = false;
            }
        },

    },

});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;