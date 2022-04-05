import { useInfiniteQuery } from "react-query";
import { userApis } from "../apis/userApi";

export default function useGetKeepItList() {
  return useInfiniteQuery(
    ["KeepItList"],
    async ({ pageParam }) => {
      const { posts } = await userApis.getKeepitList(pageParam?.cur ?? "");
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
        return { cur: nextCursor };
      },
    },
  );
}
