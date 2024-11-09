// flightSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "@/interfaces/interfaces";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "@/lib/localstorageActions";

const initialState: Flight[] = loadFromLocalStorage("flights") || [];

export const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    addFlight: (state, action: PayloadAction<Flight>) => {
      state.push(action.payload);
      saveToLocalStorage("flights", state);
    },
    removeFlight: (state, action: PayloadAction<string>) => {
      saveToLocalStorage(
        "flights",
        state.filter((hotel: Flight) => hotel.id !== action.payload)
      );
      return state.filter((hotel: Flight) => hotel.id !== action.payload);
    },
  },
});

export const { addFlight, removeFlight } = flightSlice.actions;
export default flightSlice.reducer;
