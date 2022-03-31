import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

export default function useGetProjectsByEndpoint({ slug, userId }) {
  const queryFn =
    slug === "applied"
      ? userApis.getAppliedProjects
      : userApis.getProjectsByEndpoint(slug, userId);

  return useQuery(["projects", userId, slug], queryFn, {
    select: data => data.posts,
  });
}
