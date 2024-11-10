// hotelSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/interfaces/interfaces";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "@/lib/localstorageActions";

const initialState: UserProfile[] = loadFromLocalStorage("users") || [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserProfile>) => {
      state.push(action.payload);
      saveToLocalStorage("users", state);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      saveToLocalStorage(
        "users",
        state.filter((user: UserProfile) => user.id !== action.payload)
      );
      return state.filter((user: UserProfile) => user.id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
