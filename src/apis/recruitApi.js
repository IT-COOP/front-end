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

  addRecruitComment: async ({ commentData, recruitId }) => {
    const { data } = await instance.post(
      `/recruit/${recruitId}/comment`,
      commentData,
    );
    return data;
  },

  editRecruitComment: async ({ commentData, commentId, recruitId }) => {
    console.log(commentData, commentId, recruitId);
    const { data } = await instance.put(
      `/recruit/${recruitId}/comment/${commentId}`,
      commentData,
    );
    return data;
  },

  deleteRecruitComment: async ({ recruitCommentId, recruitId }) => {
    const { data } = await instance.delete(
      `/recruit/${recruitId}/comment/${recruitCommentId}`,
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

  deleteRecruitBoard: async recruitBoardId => {
    const { data } = await instance.delete(`/recruit/${recruitBoardId}`);
    return data;
  },

  keepItRecruitBoard: async recruitBoardId => {
    const { data } = await instance.post(`/recruit/${recruitBoardId}/keep`);
    return data;
  },

  deleteKeepItRecruitBoard: async ({ recruitId, keepId }) => {
    const { data } = await instance.delete(
      `/recruit/${recruitId}/keep/${keepId}`,
    );
    return data;
  },

  applyRecruit: async ({}) => {},
};
