import { useQuery } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useGetRecruitDetailQuery(recruitId, config) {
  return useQuery(
    ["recruitBoardDetail", recruitId],
    () => {
      return recruitApis.getRecruitBoardDetail(recruitId);
    },
    {
      ...config,
    },
  );
}

export default useGetRecruitDetailQuery;
