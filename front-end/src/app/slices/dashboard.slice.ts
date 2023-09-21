import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    tasks: [],
    taskLoadingState: true,
  },
  reducers: {
    getTasksListSuccess(state, action) {
      state.tasks = action.payload?.list;
      state.taskLoadingState = false;
    },
  },
});

export const { getTasksListSuccess } = dashboardSlice.actions;

export default dashboardSlice.reducer;
