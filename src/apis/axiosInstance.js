import axios from "axios";

//import { getCookie } from "../../utils/cookie";
// import { getToken } from "../utils/until";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem("coopToken");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  error => {
    // 요청 에러 처리를 작성합니다.
    console.log(error);
    return console.log(111111);
  },
);

instance.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    // console.log(error.response);
    // return console.log(error.response);
  },
);
