import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";
export default function useGetUserDetailsQuery(userId, isCurrentUser, config) {
  return useQuery(
    ["userDetails", userId],
    userApis.getUserDetails(isCurrentUser ? "" : userId),
    {
      select: data => {
        if (data === null) {
          return data;
        }
        return data.profile;
      },
      ...config,
    },
  );
}
