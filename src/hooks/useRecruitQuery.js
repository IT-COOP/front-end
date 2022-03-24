import { useQuery } from "react-query";
import { recuritApis } from "../apis/recruitApi";

function useRecruitQuery(filter) {
  return useQuery(["recruit", filter], () => {
    console.log(filter);
    return recuritApis.getRecuritBoard(filter);
  });
}

export default useRecruitQuery;
