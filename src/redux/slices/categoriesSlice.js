import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
  },
});

export const { setCategories, addCategory, removeCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
