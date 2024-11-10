import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/interfaces/interfaces";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "@/lib/localstorageActions";

const initialState: UserProfile =
  loadFromLocalStorage("loggedUser") || ({} as UserProfile);

export const userLoggedSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    // Sets the logged-in user and saves to local storage
    addUser: (state, action: PayloadAction<UserProfile>) => {
      const userData = action.payload;
      saveToLocalStorage("loggedUser", userData);
      return userData; // Replace state with the new user data
    },
    // Clears the logged-in user from both Redux state and local storage
    removeUser: () => {
      removeFromLocalStorage("loggedUser");
      return {} as UserProfile; // Return an empty object to clear the state
    },
  },
});

export const { addUser, removeUser } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
