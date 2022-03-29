import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

export default function useGetKeepItList({ enabled }) {
  return useQuery(["KeepItList"], userApis.getKeepitList, {
    enabled,
    select: data => data.posts,
  });
}
