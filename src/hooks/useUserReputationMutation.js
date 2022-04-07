import { useMutation } from "react-query";
import { projectApis } from "../apis/projectApi";

export default function useUserReputationMutation() {
  return useMutation(postId => {
    return projectApis.userReputation(postId);
  });
}
