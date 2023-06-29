import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userSlice from "../slices/user.slice";
import tasksSaga from "../sagas/user.saga";

const middleware = createSagaMiddleware();
const sagaMiddleware = [middleware];

export default configureStore({
  reducer: { userSlice },
  middleware: (getDefaultMiddleware: Function): any =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
