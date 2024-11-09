import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jobInterfaceFull } from "@/interfaces/interfaces";

// Define initial state as an array of jobInterface
const localData = localStorage.getItem("jobs");
const parsedData = JSON.parse(localData ? localData : "[]");
const initialState: jobInterfaceFull[] = parsedData;
export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<jobInterfaceFull>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      // Assuming `id` is a unique identifier in jobInterface
      console.log(state, action.payload, "delete from store");
      return state.filter((job) => job.id !== action.payload);
    },
    edit: (state, action: PayloadAction<jobInterfaceFull>) => {
      const index = state.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { add, remove, edit } = jobsSlice.actions;
export default jobsSlice.reducer;
