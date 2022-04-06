import { useMutation } from "react-query";
import { projectApis } from "../apis/projectApi";

export default function useReviewUser() {
  return useMutation(reviewData => {
    return projectApis.userReview(reviewData);
  });
}
