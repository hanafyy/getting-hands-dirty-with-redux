import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      return action.payload; // Return new state directly for primitive types
    },
  },
});

export const { add } = searchSlice.actions;
export default searchSlice.reducer;
