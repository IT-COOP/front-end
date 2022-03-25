import { useQuery } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useRecruitQuery(filter) {
  return useQuery(["recruit", filter], () => {
    return recruitApis.getRecruitBoard(filter);
  });
}

export default useRecruitQuery;
