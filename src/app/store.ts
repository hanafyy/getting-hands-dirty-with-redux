import { configureStore } from "@reduxjs/toolkit";
import { jobsSlice } from "./features/jobs/jobsSlice";
import { userJobsSlice } from "./features/jobs/userJobSlice";
import { searchSlice } from "./features/jobs/searchSlice";
import { bookingsSlice } from "./features/travel/bookingsSlice";
import { flightSlice } from "./features/travel/flightSlice";
import { hotelSlice } from "./features/travel/hotelSlice";
import { carRentalSlice } from "./features/travel/carRentalSlice";

export const store = configureStore({
  reducer: {
    job: jobsSlice.reducer,
    userJobs: userJobsSlice.reducer,
    search: searchSlice.reducer,
    bookings: bookingsSlice.reducer,
    flights: flightSlice.reducer,
    hotels: hotelSlice.reducer,
    cars: carRentalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
