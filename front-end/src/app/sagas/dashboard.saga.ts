import { call, put, takeEvery } from "redux-saga/effects";
import Axios from "../api/api.config";
import { AxiosResponse } from "axios";
import { getTasksListSuccess } from "../slices/dashboard.slice";

function* dashboardGetEmpTaskList(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(
      Axios.get,
      `tasks?id=${action?.payload?.emp_id}&orgId=${action?.payload?.org_id}`
    );
    if (response?.data?.taskList) {
      yield put(getTasksListSuccess({ list: response?.data?.taskList }));
      return;
    }
  } catch (err: any) {
    if (err.response?.status === 401) {
      window.location.href = "/login";
    }
    console.log("error", err.message);
  }
}

function* dashboardListerSaga() {
  yield takeEvery("get_task_list", dashboardGetEmpTaskList);
}

export default dashboardListerSaga;
