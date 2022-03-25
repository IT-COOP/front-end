import { useMutation } from "react-query";
import { userApis } from "../apis/userApi";

function useUploadUserProfileImgMutation() {
  return useMutation(
    formData => {
      return userApis.uploadUserProfileImg(formData);
    },
    {
      onError: (error, variables, context) => {
        console.log(error);
        console.log(variables);
        console.log(context);
      },
      onSuccess: (data, variables, context) => {
        // 우리가 더 좋아하는 성공!
        return 123123;
      },
    },
  );
}

export default useUploadUserProfileImgMutation;
