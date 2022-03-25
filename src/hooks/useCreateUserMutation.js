import { useMutation } from "react-query";
import { userApis } from "../apis/userApi";

function useCreateUserMutation() {
  return useMutation(data => userApis.createUser(data));
}

export default useCreateUserMutation;
