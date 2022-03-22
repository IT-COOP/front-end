import axios from "axios";

//import { getCookie } from "../../utils/cookie";
import { getToken } from "../utils/until";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  async config => {
    let token = await getToken();

    config.headers["authorization"] = `Bearer ${token}`;
    return config;
  },
  error => {
    console.log(error);
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  config => {
    console.log(123123);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
