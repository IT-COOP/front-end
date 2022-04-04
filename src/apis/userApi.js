import { instance } from "./axiosInstance";

export const userApis = {
  // 유저 상세 정보 열람
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

      const copy = { ...data, profile: { ...data.profile } };
      delete copy["profile"];

      return { profile: { ...data.profile, ...copy } };
    },
  modifyUserInfo: async variables => {
    const { data } = await instance.patch("/user/profile", variables);
    return data;
  },
  // 튜토리얼 진행했는지 안했는지 판별
  checkUser: async () => {
    try {
      const { data } = await instance.get("login/validation");
      return data;
    } catch (error) {
      return error.response;
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

  getProjectsByEndpoint:
    (slug, userId = "") =>
    async () => {
      if (!Boolean(slug)) {
        throw new Error("The slug must be string and the endpoint of slug");
      }

      if (!Boolean(userId)) {
        throw new Error("UserId doesn't exist");
      }

      const endpoint = `user/${slug}/${userId}`;

      const { data } = await instance.get(endpoint);
      return data;
    },

  getRecruitingProjects: userId => async () => {
    const { data } = await instance.get(`/user/recruiting/${userId}`);
    return data;
  },

  getRunningProjects: userId => async () => {
    const { data } = await instance.get(`/user/running/${userId}`);
    return data;
  },

  getAppliedProjects: async () => {
    const { data } = await instance.get("/user/applied");
    return data;
  },
  getOveredProjects: async userId => {
    const { data } = await instance.get(`/user/over/${userId}`);
    return data;
  },

  getKeepitList: async cursor => {
    const { data } = await instance.get("/user/keep", {
      params: { items: 12, cur: cursor },
    });
    return data;
  },
};

export default instance;
