import { useMutation } from "react-query";
import { userApis } from "../apis/userApi";

function useModifyUserMutation(config = {}) {
  return useMutation(userApis.modifyUserInfo, {
    ...config,
  });
}

export default useModifyUserMutation;
