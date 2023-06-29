import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
  },
  reducers: {
    userSagaSuccess(state, action) {
      state.user = action.payload.userData;
    },
  },
});

export const { userSagaSuccess } = userSlice.actions;

export default userSlice.reducer;
