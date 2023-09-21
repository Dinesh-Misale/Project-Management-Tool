import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import { userSagaSuccess } from "../slices/user.slice";
import axios, { AxiosResponse } from "axios";
import Axios from "../api/api.config";

function* userSaga(payload: any) {
  console.log("id", payload);
  try {
    const response: AxiosResponse<any> = yield call(
      Axios.get,
      `/userInfo?uid=${payload?.userid}`
    );
    if (response?.data) {
      yield put(userSagaSuccess({ response: response?.data }));
      return;
    }
  } catch (err) {
    console.log("err", err);
  }
}

function* tasksSaga() {
  yield takeEvery("getUserInfo", userSaga);
}

export default tasksSaga;
