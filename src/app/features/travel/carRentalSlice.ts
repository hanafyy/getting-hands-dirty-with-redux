// carRentalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarRental } from "@/interfaces/interfaces";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "@/lib/localstorageActions";

const initialState: CarRental[] = loadFromLocalStorage("cars") || [];

export const carRentalSlice = createSlice({
  name: "carRentals",
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<CarRental>) => {
      state.push(action.payload);
      saveToLocalStorage("cars", state);
    },
    removeCar: (state, action: PayloadAction<string>) => {
      saveToLocalStorage(
        "cars",
        state.filter((car: CarRental) => car.id !== action.payload)
      );
      return state.filter((car: CarRental) => car.id !== action.payload);
    },
  },
});

export const { addCar, removeCar } = carRentalSlice.actions;
export default carRentalSlice.reducer;
