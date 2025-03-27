// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface/Iuser";
import { Ifollower } from "../../interface/Ifollower";
import { Repository } from "../../interface/Irepository";

interface UserState {
  user: IUser | null;
  repositories: Repository[];
  followers: Ifollower[];
}

const initialState: UserState = {
  user: null,
  repositories: [],
  followers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setRepositories: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload;
    },
    setFollowers: (state, action: PayloadAction<Ifollower[]>) => {
      state.followers = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
      state.repositories = [];
      state.followers = [];
    },
  },
});

export const { setUser, setRepositories, setFollowers, clearUserData } =
  userSlice.actions;
export default userSlice.reducer;
