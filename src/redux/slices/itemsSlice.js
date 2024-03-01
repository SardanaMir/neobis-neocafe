import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (category) => category.id !== action.payload
      );
    },
  },
});

export const { setItems, addItem } =
itemsSlice.actions;
export default itemsSlice.reducer;