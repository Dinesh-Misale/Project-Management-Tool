import axios from "axios";

let localStorage: any = window.localStorage.getItem("userData");
localStorage = JSON.parse(localStorage);

const Axios = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    Authorization:
      localStorage?.access_content?.accessToken &&
      `Bearer ${localStorage?.access_content?.accessToken}`,
    "Content-Type": "application/json",
  },
});

export default Axios;
