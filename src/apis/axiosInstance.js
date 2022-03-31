import axios from "axios";
import { deleteCookie, getCookie } from "../utils/cookie";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("coopToken");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  error => {
    console.log(error);
    return console.log(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { response, config } = error;
    const originalRequest = config;
    if (response.status === 401) {
      if (response.data.message === "Access Token Expired.") {
        const refreshToken = getCookie("coopCookie");
        let accessToken = localStorage.getItem("coopToken");
        const tokens = {
          accessToken,
          refreshToken,
        };
        if (refreshToken) {
          const { data } = await checkToken(tokens);
          accessToken = data.accessToken;
          localStorage.setItem("coopToken", accessToken);
        }
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
      }
      return axios(originalRequest);
    }

    if (response.status === 403) {
      if (response.data.message === "Access Token Maliciously Modified.") {
        localStorage.removeItem("coopToken");
        deleteCookie("coopCookie");
        return;
      }
      return axios(originalRequest);
    }

    return Promise.reject(error);
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
