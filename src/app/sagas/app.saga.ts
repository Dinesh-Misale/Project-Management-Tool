import { call, takeEvery, takeLatest } from "redux-saga/effects";
import Axios from "../api/api.config";
import { AxiosResponse } from "axios";

function* getNewTokens(action: any) {
  //   let response: any;
  try {
    const response: AxiosResponse<any> = yield call(
      Axios.post,
      "get_new_tokens",
      {
        body: action.payload,
      }
    );
    // );
    if (response.status === 200) {
      console.log(response.data);
      let userData: any = localStorage.getItem("userData");
      userData = JSON.parse(userData);
      const responseObj = {
        accessToken: response?.data?.accessToken,
        tokenExpiresIn: response?.data?.access_token_expires_in,
      };
      const refreshToken = response?.data?.refreshToken;
      userData.access_content = responseObj;
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("refreshtoken", refreshToken);
    }
  } catch (err) {
    console.log("err", err);
  }
}

function* logoutSage(payload: any) {
  yield call(Axios.post, "/logout");
}

function* listerSage() {
  //   console.log("test");
  yield takeLatest("newToken", getNewTokens);
  yield takeLatest("logout", logoutSage);
}

export default listerSage;
