import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  findedItems: [],
  searchTerm:''
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
    setFindedItem(state, action){
      state.findedItems = action.payload
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setItems, addItem, setFindedItem, removeItem, setSearchTerm } =
itemsSlice.actions;
export default itemsSlice.reducer;