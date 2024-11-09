import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "@/lib/localstorageActions";

interface SearchState {
  searchParams: {
    location: string;
    date: string;
  };
}

const initialState: SearchState = loadFromLocalStorage("searchParams") || {
  searchParams: {
    location: "",
    date: "",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams: (
      state,
      action: PayloadAction<{ location: string; date: string }>
    ) => {
      state.searchParams = action.payload;
      saveToLocalStorage("searchParams", state.searchParams);
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
