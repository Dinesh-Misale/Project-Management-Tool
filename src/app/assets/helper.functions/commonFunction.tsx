import { useDispatch } from "react-redux";
import { call, put } from "redux-saga/effects";

interface userDataType {
  access_content: {
    accessToken: string;
    tokenExpiresIn: number;
  };
}

export function* getNewTokens() {
  let userData: string | any = window.localStorage.getItem("userData");
  userData = JSON.parse(userData);
  const refreshToken = window.localStorage.getItem("refreshtoken");
  if (refreshToken && userData?.access_content?.accessToken) {
    yield put({
      type: "newToken",
      payload: { userData, refreshToken },
    });
    return true;
  } else {
    return false;
  }
}
