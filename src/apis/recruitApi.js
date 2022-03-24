import { instance } from "./axiosInstance";

export const recuritApis = {
  getRecuritBoard: async filter => {
    const { data } = await instance.get("/recruit", {
      params: {
        items: 20,
        task: "",
      },
    });
    return data;
  },
};
