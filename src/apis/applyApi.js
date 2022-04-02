import { instance } from "./axiosInstance";

export const applyApis = {
  getApplyRecruitUser: async recruitId => {
    const response = await instance.get(
      `/user/recruiting/applies/${recruitId}`,
    );
    return response;
  },
  getApplyCompletionRecruitUser: async recruitId => {
    const { data } = await instance.get(
      `user/recruiting/accepted/${recruitId}`,
    );
    return data;
  },
  //임시로 여기다 두겠습니다
  completeRecruitStartProject: async recruitId => {
    const { data } = await instance.post(`user/${recruitId}/create`);
    return data;
  },
};
