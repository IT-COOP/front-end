import axios from "axios";
import { getCookie } from "../utils/cookie";

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
  response => {
    return response;
  },
  async error => {
    const { response } = error;
    if (response.status === 401) {
      if (response.data.message === "Access Token Expired") {
        //const originalRequest = config;
        const refreshToken = getCookie("coopCookie");

        let accessToken = localStorage.getItem("coopToken");
        const tokens = {
          accessToken,
          refreshToken,
        };
        if (refreshToken) {
          const response = await checkToken(tokens);
          console.log(response);
        }
      }
    }
  },
);

const checkToken = async ({ accessToken, refreshToken }) => {
  const response = await instance.get("login/refresh", {
    headers: {
      authorization: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    },
  });
  return response;
};
