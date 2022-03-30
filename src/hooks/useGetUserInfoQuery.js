import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetUserInfoQuery(userId = "", config) {
  return useQuery(
    ["userInfo", userId || "currentUser"],
    userApis.getUserInfo(userId),
    {
      staleTime: 3000000,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      keepPreviousData: true,
      select: data => data?.profile ?? null,
      ...config,
    },
  );
}

export default useGetUserInfoQuery;
