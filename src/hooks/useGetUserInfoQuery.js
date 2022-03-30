import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetUserInfoQuery(userId = "", config) {
  return useQuery(
    ["userInfo", userId || "currentUser"],
    userApis.getUserInfo(userId),
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      ...config,
    },
  );
}

export default useGetUserInfoQuery;
