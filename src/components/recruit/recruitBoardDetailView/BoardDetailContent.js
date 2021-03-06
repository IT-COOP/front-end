import React from "react";
import { useNavigate } from "react-router-dom";
import { KeepIt, KeepItActive } from "../../../assets/icons";
import convertDateText from "../../../lib/convertDateText";

function BoardDetailContent({ recruitBoard }) {
  const navigate = useNavigate();

  const handleUserProfileClick = () => {
    navigate(`/user/${recruitBoard?.userId}`);
  };

  return (
    <>
      <li className="mb-[70px] w-full overflow-hidden">
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleUserProfileClick}
          >
            <img
              src={recruitBoard?.userProfileImgUrl}
              alt="유저 프로필사진"
              className="w-[44px] h-[44px] mr-[10px] rounded-[50%] bg-black"
            />
            <span className="text-[21px]">{recruitBoard?.nickname}</span>
          </div>
          <span className="mx-[15px]">|</span>
          <span className="text-[21px]">
            {convertDateText(recruitBoard?.createdAt)}
          </span>
        </div>
      </li>
      <li className="px-[104px] mb-[80px]">
        {recruitBoard?.recruitContent.split("\n").map((text, idx) => {
          if (text !== "") {
            return (
              <p key={idx} className="w-full break-all">
                {text}
              </p>
            );
          }
          return false;
        })}
      </li>
      <li className="text-right mb-[34px]">
        <p className="text-[23px]">
          {!Boolean(recruitBoard?.keepId) ? (
            <KeepIt className="inline-block w-[24px] h-[24px]" />
          ) : (
            <KeepItActive className="inline-block w-[24px] h-[24px]" />
          )}
          <span className="ml-[6px]"> {recruitBoard?.recruitKeepCount}</span>
        </p>
      </li>
    </>
  );
}

export default BoardDetailContent;
