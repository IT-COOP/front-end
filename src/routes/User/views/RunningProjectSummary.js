import React from "react";
import classNames from "classnames";
import useGetProjectsByEndpoint from "../../../hooks/useGetProjectsByEndpoint";
import { More } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";

function RunningProjectSummary({ userId }) {
  const navigate = useNavigate();
  const { data: projectList, isLoading } = useGetProjectsByEndpoint({
    slug: "running",
    userId,
  });

  if (isLoading) {
    return (
      <>
        <div className="w-full h-[189px] bg-gray1 animate-pulse" />
      </>
    );
  }

  const handleChatButtonClick = chatId => () => navigate(`/chat/${chatId}`);

  const isRunning = projectList?.length !== 0;

  const colorChip = (
    <div
      className={classNames(
        "text-[11px] h-[14px] rounded-[8.5px] px-[6px] text-white uppercase font-bold",
        {
          "bg-blue": isRunning,
          " bg-gray4": !isRunning,
        },
      )}
    >
      <span className="relative top-px">{isRunning ? "on" : "off"}</span>
    </div>
  );

  return (
    <>
      <hr className="w-full block border-gray2 mt-[19px]"></hr>
      <div className="">
        <div className="p-[20px] pb-0 pt-[24px] mb-[9px] text-[17px] flex items-start gap-x-[3px]">
          <span>팀 채팅방</span>
          {colorChip}
        </div>
        {isRunning ? (
          <ul>
            {projectList
              .slice(0, 3)
              .map(
                (
                  { recruitPostId, title, chatRooms: { chatRoomId } },
                  index,
                  { length },
                ) => (
                  <React.Fragment key={recruitPostId}>
                    <li
                      className={classNames(
                        "flex flex-col justify-between h-[91px] px-[20px]",
                        {
                          "mb-[43px]": index + 1 === length,
                        },
                      )}
                    >
                      <p className="line-clamp-1 text-[15px] text-gray3">
                        {title}
                      </p>
                      <button
                        className="inline-block w-full text-right text-[15px] text-blue3 cursor-pointer"
                        onClick={handleChatButtonClick(chatRoomId)}
                      >
                        채팅하러 가기{" "}
                        <More
                          width={15}
                          className="inline-block stroke-blue3 fill-blue3"
                        />
                      </button>
                    </li>
                    {index + 1 === length ? null : (
                      <hr className="w-full block border-gray2 mt-[43px] mb-[24px]"></hr>
                    )}
                  </React.Fragment>
                ),
              )}
          </ul>
        ) : (
          <div className="mt-[9px] h-[137px]">
            <p className="text-[15px] text-gray3">
              진행 중인 프로젝트가 없습니다
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default RunningProjectSummary;
