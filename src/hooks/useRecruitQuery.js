import { useQuery } from "react-query";
import { recuritApis } from "../apis/recruitApi";

export const useGetRecruit = () => {
  return useQuery("recruit", () => {
    return recuritApis.getRecuritBoard();
  });
};
