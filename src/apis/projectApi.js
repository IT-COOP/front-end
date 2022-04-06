import { instance } from "./axiosInstance";

export const projectApis = {
  completeRecruitStartProject: async recruitId => {
    const { data } = await instance.post(`user/${recruitId}/create`);
    return data;
  },
  userReputation: async recruitId => {
    const { data } = await instance.get(
      `user/recruiting/reputation/${recruitId}`,
    );
    return data;
  },
  userReview: async reviewData => {
    const { data } = await instance.post(`user/rate`, reviewData);
    return data;
  },
};
