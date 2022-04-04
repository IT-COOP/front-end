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
  //임시로 여기다 두겠습니다
  completeRecruitStartProject: async recruitId => {
    const { data } = await instance.post(`user/${recruitId}/create`);
    return data;
  },

  acceptOrRefuseAppliedUser: async ({
    applicant,
    recruitPostId,
    isAccepted,
  }) => {
    console.log(applicant, recruitPostId, isAccepted);
    const { data } = await instance.post("user/recruiting/response", {
      applicant,
      recruitPostId,
      isAccepted,
    });
    return data;
  },
};
