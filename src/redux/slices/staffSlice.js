import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    staff: [],
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaffInfo(state, action){
            state.staff = action.payload
        },
    },
});

export const {setStaffInfo} = staffSlice.actions;
export default staffSlice.reducer;