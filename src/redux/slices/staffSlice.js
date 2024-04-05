import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: [],
  findedStaff: [],
  searchTerm: "",
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaffInfo(state, action) {
      state.staff = action.payload;
    },
    setFindedStaff(state, action) {
      state.findedStaff = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setStaffInfo, setFindedStaff, setSearchTerm } =
  staffSlice.actions;
export default staffSlice.reducer;
