import { instance } from "./axiosInstance";

export const applyApis = {
  getApplyRecruitUser: async recruitId => {
    const response = await instance.get(
      `/user/recruiting/applies/${recruitId}`,
    );
    return response;
  },
  getApplyCompletionRecruitUser: async recruitId => {
    console.log(recruitId);
    const { data } = await instance.get(
      `user/recruiting/accepted/${recruitId}`,
    );
    return data;
  },
};
