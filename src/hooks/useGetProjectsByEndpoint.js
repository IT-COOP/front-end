import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

export default function useGetProjectsByEndpoint({
  slug,
  isCurrentUser,
  userId,
}) {
  const queryFn =
    slug === "applied"
      ? userApis.getAppliedProjects
      : userApis.getProjectsByEndpoint(
          slug,
          isCurrentUser ? undefined : userId,
        );

  return useQuery(["projets", userId, slug], queryFn, {
    select: data => data.posts,
  });
}
