import { useMutation } from "react-query";
import { userApis } from "../apis/userApi";

function useUserCheckMutation() {
  return useMutation(["userCheck"], userApis.checkUser);
}

export default useUserCheckMutation;
