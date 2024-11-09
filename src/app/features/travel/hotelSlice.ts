// hotelSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hotel } from "@/interfaces/interfaces";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "@/lib/localstorageActions";

const initialState: Hotel[] = loadFromLocalStorage("hotels") || [];

export const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.push(action.payload);
      saveToLocalStorage("hotels", state);
    },
    removeHotel: (state, action: PayloadAction<string>) => {
      saveToLocalStorage(
        "hotels",
        state.filter((hotel: Hotel) => hotel.id !== action.payload)
      );
      return state.filter((hotel: Hotel) => hotel.id !== action.payload);
    },
  },
});

export const { addHotel, removeHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
