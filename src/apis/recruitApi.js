import { instance } from "./axiosInstance";

export const recuritApis = {
  getRecuritBoard: async () => {
    const { data } = await instance.get("/recruit");
    return data;
  },
};
