import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "@/lib/localstorageActions";
import { Booking } from "@/interfaces/interfaces";

const initialState: Booking[] = loadFromLocalStorage("bookings") || [];
export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.push(action.payload);
      saveToLocalStorage("bookings", state);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
        saveToLocalStorage("bookings", state);
      }
    },

    cancelBooking: (state, action: PayloadAction<string>) => {
      const updatedBookings = state.map((booking) =>
        booking.id === action.payload
          ? { ...booking, status: "canceled" }
          : booking
      );
      state = updatedBookings as Booking[];
      saveToLocalStorage("bookings", state);
    },
  },
});

export const { addBooking, updateBooking, cancelBooking } =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
