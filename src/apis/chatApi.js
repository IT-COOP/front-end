import { instance } from "./axiosInstance";

async function getChatRoomNumber() {
  const { data } = await instance.get("/chat");
  return data;
}

export default getChatRoomNumber;
