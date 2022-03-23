import { instance } from "./axiosInstance";

export const recuritApis = {
  getRecuritBoard: async filter => {
    console.log(filter);
    const { data } = await instance.get("/recruit", {
      params: {
        items: 20,
      },
    });
    return data;
  },
};
