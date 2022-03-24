import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useUserCheckQuery(token) {
  console.log("customhook", token);
  return useQuery(["user", token], () => {
    return userApis.checkUser(token);
  });
}

export default useUserCheckQuery;
