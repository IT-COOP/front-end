import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetUserInfoQuery(token) {
  return useQuery(
    ["user", token],
    () => {
      return userApis.getUserInfo(token);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );
}

export default useGetUserInfoQuery;
