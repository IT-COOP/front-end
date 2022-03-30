import { useMutation } from "react-query";
import { userApis } from "../apis/userApi";

function useModifyUserMutation(config = {}) {
  return useMutation("modifyUser", userApis.modifyUserInfo, {
    ...config,
  });
}

export default useModifyUserMutation;
