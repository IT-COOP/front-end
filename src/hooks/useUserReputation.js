import { useQuery } from "react-query";
import { projectApis } from "../apis/projectApi";

export default function useUserReputation(postId) {
  return useQuery(["Reputation"], () => {
    return projectApis.userReputation(postId);
  });
}
