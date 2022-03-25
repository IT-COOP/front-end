import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useUserCheckQuery(token) {
  return useQuery(["userCheck", token], () => userApis.checkUser(token));
}

export default useUserCheckQuery;
