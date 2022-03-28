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
    console.log(commentData.data);

    const response = await instance.post(
      `/recruit/${commentData.recruitId}/comment`,
      commentData.data,
    );
    console.log(response);
    return response;
  },

  addRecruitBoard: async recruitBoardInfo => {
    console.log(recruitBoardInfo);
    const response = await instance.post("/recruit", recruitBoardInfo);
    return response;
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

  deleteRecruitBoard: async recruitBoardId => {
    const { data } = await instance.delete(`/recruit/${recruitBoardId}`);
    return data;
  },

  keepItRecruitBoard: async recruitBoardId => {
    const { data } = await instance.post(`/recruit/${recruitBoardId}/keepIt`);
    return data;
  },
};
