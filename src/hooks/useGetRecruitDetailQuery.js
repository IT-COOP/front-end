import { useQuery } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useGetRecruitDetailQuery(recruitId) {
  return useQuery(["recruitBoardDetail", recruitId], () => {
    return recruitApis.getRecruitBoardDetail(recruitId);
  });
}

export default useGetRecruitDetailQuery;
