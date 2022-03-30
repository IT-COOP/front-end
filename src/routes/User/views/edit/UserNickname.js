import React from "react";
import { useQueryClient } from "react-query";

function UserNickname() {
  const client = useQueryClient();
  const { userInfo } = client.getQueryData("userInfo");
  return (
    <article className="mb-[35px]">
      <h2 className="font-medium text-[17px]">닉네임</h2>
      <p className="mt-[18px] mb-[8px] py-[21px] px-[10px] w-full bg-[#F9FAFB] font-medium text-[19px]">
        {userInfo.nickname}
      </p>
      <p className="font-medium text-[18px] text-gray3">
        Itcoop 에서 사용되는 닉네임 입니다.
      </p>
    </article>
  );
}

export default UserNickname;
