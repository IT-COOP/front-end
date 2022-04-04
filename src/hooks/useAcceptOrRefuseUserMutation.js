import { useMutation } from "react-query";
import { applyApis } from "../apis/applyApi";

export default function useAcceptOrRefuseUserMutation() {
  return useMutation(sendData => applyApis.acceptOrRefuseAppliedUser(sendData));
}
