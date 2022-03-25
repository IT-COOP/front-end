import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetUserInfoQuery(token) {
  return useQuery(
    ["userInfo", token],
    () => {
      if (token) {
        return userApis.getUserInfo(token);
      } else {
        return;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );
}

export default useGetUserInfoQuery;
