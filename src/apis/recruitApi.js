import { instance } from "./axiosInstance";

export const recuritApis = {
  getRecuritBoard: async filter => {
    const { data } = await instance.get("/recruit", {
      params: filter,
    });
    return data;
  },
};
