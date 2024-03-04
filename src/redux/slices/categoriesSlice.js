import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  stock:[]
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
        (category) => category.id !== action.payload
      );
    },
    setStock(state, action){
      state.stock = action.payload
    }
  },
});

export const { setCategories, addCategory, removeCategory, setStock } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
