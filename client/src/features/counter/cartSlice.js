import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line
import { current } from "@reduxjs/toolkit"; // to console.log store objects
// console.log('==>state:');
// console.log(current(state));

const initialState = {
  itemsAdded: [],
  fnfItemAdded: [],
  fnfItemsTotal: 0,
  total: 0,
  CartIsOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { newItem, size, newQuantity } = action.payload;

      const existingItem = state.itemsAdded.find(
        (item) => item.id === newItem.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        state.total += newItem.priceInCad;
      } else {
        const modifiedItem = { ...newItem, size: size, quantity: newQuantity };
        state.itemsAdded.push(modifiedItem);
        state.total = state.total + newQuantity * newItem.priceInCad;
      }
    },
    addFnFItem: (state, action) => {
      const { itemToAdd } = action.payload;

      state.fnfItemAdded.push(itemToAdd);
      state.fnfItemsTotal += itemToAdd.price;

    },
    removeFnFItem: (state, action) => {
      const { itemToRemove } = action.payload;
      const index = state.fnfItemAdded.findIndex(
        (item) => item.name === itemToRemove.name
      );

      // console.log("@ -remove called", itemToRemove);
      if (index !== -1) {
        state.fnfItemsTotal -= state.fnfItemAdded[index].price;
        state.fnfItemAdded.splice(index, 1);

        const storageKey = `isAdded_${itemToRemove.name}`;
        localStorage.setItem(storageKey, "false");

        window.dispatchEvent(
          new CustomEvent("storageUpdate", { detail: storageKey })
        );
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity, oldSize, priceInCad } = action.payload;
      const itemToUpdate = state.itemsAdded.find(
        (item) => item.id === id && item.size === oldSize
      );
      if (itemToUpdate) {
        itemToUpdate.quantity += quantity; //plus or minus depeing on props
        state.total += priceInCad * quantity;

        if (itemToUpdate.quantity === 0) {
          let targetIndex = state.itemsAdded.findIndex(
            (obj) => obj.quantity === 0
          );
          if (targetIndex !== -1) {
            state.itemsAdded.splice(targetIndex, 1);
          }
        }
      }
    },

    setCartIsOpen: (state, action) => {
      state.CartIsOpen = action.payload;
    },

    resetCart: (state) => {
      state.CartIsOpen = false;

      state.itemsAdded = [];
      state.total = 0;

      state.fnfItemAdded.forEach((item) => { // Changed from .map to .forEach
        let storageKey = `isAdded_${item.name}`;
        localStorage.setItem(storageKey, "false");
      });

      state.fnfItemAdded = [];
      state.fnfItemsTotal = 0;
    },
  },
});

export const {
  addItem,
  addFnFItem,
  removeFnFItem,
  updateQuantity,
  setCartIsOpen,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
