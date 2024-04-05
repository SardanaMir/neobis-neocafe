import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  findedItems: [],
  searchTerm:'',
  search: ''
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
    searchByName(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setItems, addItem, setFindedItem, removeItem, setSearchTerm, searchByName } =
itemsSlice.actions;
export default itemsSlice.reducer;