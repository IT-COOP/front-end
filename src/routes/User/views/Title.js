import React from "react";

function Title({ isCurrentUserPage }) {
  return (
    <div className="flex justify-between mb-[13px] pt-[64px]">
      {isCurrentUserPage ? (
        <>
          <h1 className="text-[21px] font-[700] leading-[26px]">마이페이지</h1>
          <button className="text-[19px] font-[500] bg-blue2 px-[17px] py-[6px] rounded-[5px] text-white">
            프로필 수정하기
          </button>
        </>
      ) : null}
    </div>
  );
}

export default Title;
