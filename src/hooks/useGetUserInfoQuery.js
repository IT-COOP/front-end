import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetUserInfoQuery() {
  return useQuery(
    ["userInfo"],
    () => {
      if (localStorage.getItem("coopToken")) {
        return userApis.getUserInfo();
      }
      return null;
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );
}

export default useGetUserInfoQuery;
