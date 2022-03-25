import { instance } from "./axiosInstance";

export const userApis = {
  // 토큰 확인해서 회원가입한 사람이면 유저 정보 가져오고 아니면 빈 스트링 받음
  checkToken: async ({ accessToken, refreshToken }) => {
    const response = await instance.get("login/refresh", {
      headers: {
        authorization: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      },
    });
    return response;
  },

  checkUser: async () => {
    const { data } = await instance.get("login/validation");
    return { data };
  },

  getUserInfo: async () => {
    const response = await instance.get("login/me");
    return response;
  },

  uploadUserProfileImg: async formData => {
    const { data } = await instance.post("upload/profile", formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });
    return { data };
  },

  confirmUserNickname: async name => {
    const response = await instance.get(
      `login/duplicateCheck/nickname/${name}`,
    );
    return response;
  },

  //최초 로그인이나, 유저정보 튜토리얼 완성 안한 사람들
  createUser: async userData => {
    console.log(userData);
    const { data } = await instance.post("login/completion", userData);
    return data;
  },

  //유저 데이터 수정
  userProfileEdit: async data =>
    instance.post("api/", {
      data,
    }),
};

export default instance;
