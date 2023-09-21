import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

// interface protectedRouteProps {

// }

const ProtectedRoute = () => {
  const loading = true;
  const authContent: string | any = localStorage.getItem("accessContent");
  const accessToken = `Bearer ${parseInt(authContent?.accessToken)}`;
  const refreshToken = `Bearer ${parseInt(authContent?.refreshToken)}`;
  //   const accessToken = `Barrer ${appContext.accessContent.accessToken}`;
  const checkIfValidUser = async () => {
    try {
      if (accessToken && refreshToken) {
        try {
          const response = await axios.get(`https://localhost:5001/validate`, {
            headers: { Authorization: accessToken },
          });
          if (response.status === 200) {
            console.log("redirect to desired page");
            return true;
          }
          if (response.status == 401) {
            const res = await axios.get("http://localhost:5001/getNewTokens", {
              headers: { Authorization: refreshToken },
            });
            if (res.status === 200) {
              console.log("set the access token and refresh token");
              console.log("redirect to desired page");
            }
          }
        } catch (error: any) {
          return "error";
        }
      } else {
        return false;
      }
    } catch (err) {
      return "error";
    }
  };
};
