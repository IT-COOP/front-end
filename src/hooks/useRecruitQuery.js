import { useQuery } from "react-query";
import { recuritApis } from "../apis/recruitApi";

function useRecruitQuery() {
  return useQuery(["recruit"], () => {
    return recuritApis.getRecuritBoard();
  });
}

export default useRecruitQuery;
