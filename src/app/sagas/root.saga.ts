import { all } from "redux-saga/effects";
import tasksSaga from "./user.saga";
import listerSage from "./app.saga";
import dashboardListerSaga from "./dashboard.saga";

function* rootSaga() {
  yield all([listerSage(), tasksSaga(), dashboardListerSaga()]);
}

export default rootSaga;
