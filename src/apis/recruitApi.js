import { instance } from "./axiosInstance";

export const recruitApis = {
  getRecruitBoard: async filter => {
    const { data } = await instance.get("/recruit", {
      params: filter,
    });

    return data;
  },
  getRecruitBoardDetail: async recruitId => {
    const { data } = await instance.get(`/recruit/${recruitId}`);
    return data;
  },

  addRecruitComment: async commentData => {
    const { data } = await instance.post(
      `/recruit/${commentData.recruitId}/comment`,
      commentData.data,
    );
    return data;
  },

  addRecruitBoard: async recruitBoardInfo => {
    const { data } = await instance.post("/recruit", recruitBoardInfo);
    return data;
  },

  uploadRecruitBoardImg: async formData => {
    const { data } = await instance.post("upload/recruit", formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });
    return { data };
  },
};
