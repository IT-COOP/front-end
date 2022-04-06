import { instance } from "./axiosInstance";

export const applyApis = {
  getApplyRecruitUser: async (recruitId, isAccepted) => {
    const { data } = await instance.get(
      `/user/recruiting/applies/${recruitId}?isAccepted=${isAccepted}`,
    );
    return data;
  },
  getApplyCompletionRecruitUserCount: async recruitId => {
    const { data } = await instance.get(
      `user/recruiting/accepted/${recruitId}`,
    );
    return data;
  },

  acceptOrRefuseAppliedUser: async ({
    applicant,
    recruitPostId,
    isAccepted,
  }) => {
    const { data } = await instance.post("user/recruiting/response", {
      applicant,
      recruitPostId,
      isAccepted,
    });
    return data;
  },
};
