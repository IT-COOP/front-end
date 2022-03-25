import { instance } from "./axiosInstance";

export const recruitApis = {
  getRecruitBoard: async filter => {
    const { data } = await instance.get("/recruit", {
      params: filter,
    });
    return data;
  },
};
