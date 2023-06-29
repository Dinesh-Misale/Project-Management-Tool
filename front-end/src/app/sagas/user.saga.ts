import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import { userSagaSuccess } from "../slices/user.slice";
import axios from "axios";

const makeCall = (): {} => {
  const response = axios.get("https://localhost:5001/getUserData");
  return response;
};

function* userSaga(): any {
  const response = yield call(makeCall);
  yield put(userSagaSuccess({ payload: response }));
}

function* tasksSaga() {
  yield takeEvery("makeCall", userSaga);
}

export default tasksSaga;
