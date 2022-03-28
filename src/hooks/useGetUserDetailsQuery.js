import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";
export default function useGetUserDetailsQuery(userId, isCurrentUser) {
  return useQuery(
    ["userDetails", userId],
    userApis.getUserDetails(isCurrentUser ? "" : userId),
    {
      select: data => data.profile,
    },
  );
}
