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

  // 유저 상세 정보 열람
  // 사용처: 유저 상세 페이지
  getUserInfo:
    (userId = "") =>
    async () => {
      const token = localStorage.getItem("coopToken");
      if (!token) {
        return null;
      }

      const { data } = await instance.get(
        `user/profile${userId ? `/${userId}` : ""}`,
      );
      return data;
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

  getProjectsByEndpoint:
    (slug, anotherUserId = "") =>
    async () => {
      if (!Boolean(slug)) {
        throw new Error("The slug must be string and the endpoint of slug");
      }

      const endpoint = anotherUserId
        ? `user/profile/${anotherUserId}/${slug}`
        : `user/${slug}`;

      const { data } = await instance.get(endpoint);
      return data;
    },

  getAppliedProjects: async () => {
    const { data } = await instance.get("/user/applied");
    return data;
  },

  getKeepitList: async () => {
    const { data } = await instance.get("/user/mykeep");
    return data;
  },
};

export default instance;
