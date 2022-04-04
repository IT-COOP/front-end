import React from "react";

function UserNickname({ nickname }) {
  return (
    <article className="mb-[35px]">
      <h2 className="font-medium text-[17px]">닉네임</h2>
      <p className="mt-[18px] mb-[8px] py-[21px] px-[10px] w-full bg-white4 font-medium text-[19px]">
        {nickname}
      </p>
      <p className="font-medium text-[18px] text-gray3">
        Itcoop 에서 사용되는 닉네임 입니다.
      </p>
    </article>
  );
}

export default UserNickname;
