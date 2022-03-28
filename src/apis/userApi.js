import { instance } from "./axiosInstance";

export const userApis = {
  // 튜토리얼 진행했는지 안했는지 판별
  checkUser: async () => {
    try {
      const { data } = await instance.get("login/validation");
      return data;
    } catch (error) {
      return Promise.reject("checkUser");
    }
  },

  getUserInfo: async () => {
    try {
      const { data } = await instance.get("login/me");
      return data;
    } catch (error) {
      return Promise.reject("getUserInfo");
    }
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
    const { data } = await instance.get(
      `login/duplicateCheck/nickname/${name}`,
    );
    return { data };
  },

  //최초 로그인이나, 유저정보 튜토리얼 완성 안한 사람들
  createUser: async userData => {
    const { data } = await instance.post("login/completion", userData);
    return data;
  },
};

export default instance;
