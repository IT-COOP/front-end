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
};
