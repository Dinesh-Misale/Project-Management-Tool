import axios from "axios";

const getHeader = () => {
  let localStorage: any = window.localStorage.getItem("userData");
  localStorage = JSON.parse(localStorage);
  return localStorage?.access_content?.accessToken;
};

const Axios = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    Authorization: `Bearer ${getHeader()}`,
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const accessToken = getHeader();
    if (accessToken) {
      config!.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// testing
// const Axios = () => {
//   let ls: any = window.localStorage.getItem("userData");
//   ls = JSON.parse(ls);
//   return axios.create({
//     // baseURL: "http://localhost:3002",
//     headers: {
//       Authorization:
//         ls?.access_content?.accessToken &&
//         `Bearer ${ls?.access_content?.accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });
// };

export default Axios;
