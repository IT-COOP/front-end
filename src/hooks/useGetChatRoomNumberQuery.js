import { useQuery } from "react-query";
import getChatRoomNumber from "../apis/chatApi";

function useGetChatRoomNumberQuery() {
  return useQuery(["getChatRoomNumber"], () => {
    return getChatRoomNumber();
  });
}

export default useGetChatRoomNumberQuery;
