import React from "react";
// import useGetUserDetailsQuery from "../../../hooks/useGetUserDetailsQuery";

function UserDetails({ portfolioUrl, selfIntroduction }) {
  return (
    <div className="w-full bg-white p-[30px] border border-solid border-gray2 rounded-[8px] mb-[42px] flex-1">
      <div className="mb-[36px]">
        <p className="font-medium text-[17px] mb-[22px]">포트폴리오</p>
        {Boolean(portfolioUrl) ? (
          <a
            className="pl-[14px] text-blue2 underline text-[15px] font-medium"
            href={portfolioUrl}
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
        <div className="pl-[14px] text-[15px] h-[70px] overflow-y-auto applyUserUl">
          {selfIntroduction?.split("\n").map((text, idx) => {
            if (text !== "") {
              return <p key={idx}>{text}</p>;
            }
            return false;
          }) || "작성한 소개글이 없습니다."}
        </div>
      </div>
    </div>
  );
}
export default UserDetails;
