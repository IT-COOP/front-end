import { instance } from "./axiosInstance";

export const userApis = {
  // 토큰 확인해서 회원가입한 사람이면 유저 정보 가져오고 아니면 빈 스트링 받음
  checkUser: async () => {
    const { data } = await instance.get("login/validation");
    return { data };
  },

  getUserInfo: async () => {
    const { data } = await instance.get("login/me");
    return data;
  },

  uploadUserProfileImg: async formData => {
    console.log(formData);
    const response = await instance.post("upload/profile", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response;
  },

  confirmUserNickname: async name => {
    const { data } = await instance.post(
      `login/duplicateCheck/nickname/${name}`,
    );
    return data;
  },

  //최초 로그인이나, 유저정보 튜토리얼 완성 안한 사람들
  createUser: ({ data }) => instance.post("login/completion", data),

  //유저 데이터 수정
  userProfileEdit: data =>
    instance.post("api/", {
      data,
    }),
};

export default instance;
