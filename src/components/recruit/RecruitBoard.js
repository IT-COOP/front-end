import React from "react";

function RecruitBoard({
  title,
  createdAt,
  imgUrls,
  nickname,
  recruitCommentCount,
  recruitKeeps,
  recruitLocation,
  recruitTasks,
  recruitStacks,
  recruitKeepCount,
}) {
  return (
    <li>
      <img
        src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
        alt="게시글 사진"
        className="border-5 h-[186px]"
      />
      {/* 이미지파일 */}
      <div className="sm:px-[20px]">
        <h1 className="line-clamp-2 font-bold sm:mt-[13px] ">{title}</h1>
        <ul className="flex sm:mb-[20px] sm:mt-[30px]">
          <li className="bg-[#c0c0c0] rounded-[11px] sm:mr-[8px] sm:px-[8px] sm:py-[2px] text-[14px]">
            <span className="relative -top-[0.5px]">프론트엔드</span>
          </li>
          <li className="bg-[#c0c0c0] rounded-[11px] sm:mr-[8px] sm:px-[8px] sm:py-[2px] text-[14px]">
            <span className="relative -top-[0.5px]">백엔드</span>
          </li>
        </ul>
        <ul className="flex justify-between sm:mb-[12px]">
          <li className="flex">
            <p>{createdAt}</p>
            <p>{nickname}</p>
          </li>
          <li className="flex">
            <p>{recruitCommentCount}</p>
            <p>{recruitKeepCount}</p>
          </li>
        </ul>
      </div>
    </li>
  );
}

export default RecruitBoard;
