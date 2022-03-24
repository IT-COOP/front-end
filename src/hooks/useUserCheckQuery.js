import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useUserCheckQuery(token) {
  return useQuery(["user", token], () => {
    return userApis.checkUser(token);
  });
}

export default useUserCheckQuery;
