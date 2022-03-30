import React from "react";
import useGetUserDetailsQuery from "../../../hooks/useGetUserDetailsQuery";

function UserDetails({ portfolioUrl, selfIntroduction }) {
  return (
    <div className="w-full bg-white p-[30px] border border-solid border-gray2 rounded-[8px] mb-[42px]">
      <div className="mb-[36px]">
        <p className="font-medium text-[17px] mb-[22px]">포트폴리오</p>
        {Boolean(portfolioUrl) ? (
          <a
            className="pl-[14px] text-blue2 underline text-[15px] font-medium"
            href="https://www.naver.com"
            target="_blank"
            rel="noreferrer"
          >
            {portfolioUrl}
          </a>
        ) : (
          <span className="pl-[14px] text-[15px] font-medium">
            작성한 포트폴리오 URL이 없습니다.
          </span>
        )}
      </div>
      <div className="">
        <p className="mb-[22px] text-[17px] font-medium">소개글</p>
        <p className="pl-[14px] text-[15px]">
          {selfIntroduction || "작성한 소개글이 없습니다."}
        </p>
      </div>
    </div>
  );
}
export default UserDetails;
