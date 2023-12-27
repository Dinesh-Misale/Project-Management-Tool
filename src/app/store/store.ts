import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userSlice from "../slices/user.slice";
import dashboardSlice from "../slices/dashboard.slice";
import rootSaga from "../sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();
// const sagaMiddleware = [middleware];

export default configureStore({
  reducer: { userSlice, dashboardSlice },
  middleware: (getDefaultMiddleware: Function): any =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
