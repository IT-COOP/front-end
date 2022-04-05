import { useMutation } from "react-query";
import { userApis } from "../apis/userApi";

function useConfirmNicknameMutation() {
  return useMutation(nickname => {
    return userApis.confirmUserNickname(nickname);
  });
}

export default useConfirmNicknameMutation;
