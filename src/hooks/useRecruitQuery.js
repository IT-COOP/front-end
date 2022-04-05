import { useInfiniteQuery } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useRecruitQuery(filter) {
  return useInfiniteQuery(
    ["recruit", filter],
    async ({ pageParam }) => {
      const posts = await recruitApis.getRecruitBoard({
        ...filter,
        cur: pageParam?.cur ?? "",
      });
      const nextCursor = posts[posts.length - 1]?.recruitPostId;
      return {
        posts,
        nextCursor,
      };
    },
    {
      getNextPageParam: ({ nextCursor }) => {
        if (!nextCursor) {
          return undefined;
        }
        return {
          cur: nextCursor,
        };
      },
    },
  );
}

export default useRecruitQuery;
