import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jobInterfaceFull } from "@/interfaces/interfaces";

// Define initial state as an array of jobInterface
const localData = localStorage.getItem("userJobs");
const parsedData = JSON.parse(localData ? localData : "[]");
const initialState: jobInterfaceFull[] = parsedData;

export const userJobsSlice = createSlice({
  name: "userJobs",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<jobInterfaceFull>) => {
      console.log(action.payload, "data in user slice");
      state.push(action.payload);
      const jobs = localStorage.getItem("userJobs");
      if (jobs) {
        const parsedJobs = JSON.parse(jobs);
        const newJobs = [...parsedJobs, action.payload];
        const newStringfiedJobs = JSON.stringify(newJobs);
        localStorage.setItem("userJobs", newStringfiedJobs);
      } else {
        const newStringfiedJobs = JSON.stringify([action.payload]);
        localStorage.setItem("userJobs", newStringfiedJobs);
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const localData = localStorage.getItem("userJobs");
      const parsedData = JSON.parse(localData ? localData : "[]");
      const newParsedData = parsedData.filter(
        (job: jobInterfaceFull) => job.id !== action.payload
      );
      localStorage.setItem("userJobs", JSON.stringify(newParsedData));
      return state.filter((job) => job.id !== action.payload);
    },
  },
});

export const { add, remove } = userJobsSlice.actions;
export default userJobsSlice.reducer;
