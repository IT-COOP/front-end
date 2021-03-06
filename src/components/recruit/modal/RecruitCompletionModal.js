import React from "react";
import { useNavigate } from "react-router-dom";

import { Close, Duo } from "../../../assets/icons";

import useGetApplyCompletionRecruitUserCount from "../../../hooks/useGetApplyCompletionRecruitUserCount";
import useCompleteRecruitStartProjectMutation from "../../../hooks/useCompleteRecruitStartProjectMutation";
import classNames from "classnames";

const RecruitCompletionModal = ({ recruitId, closeModal }) => {
  const navigate = useNavigate();

  const { data: applyCompletionUserCount } =
    useGetApplyCompletionRecruitUserCount(recruitId);
  const { mutateAsync } = useCompleteRecruitStartProjectMutation();

  const completeRecruitStartProject = async () => {
    const { chatRoom } = await mutateAsync(recruitId);
    navigate(`/chat/${chatRoom.chatRoomId}`);
  };

  const routeAppliedUserList = () => {
    navigate(`/apply/${recruitId}`);
  };

  console.log(applyCompletionUserCount?.acceptedAppliesCount);

  return (
    <section className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <div className="relative w-[800px] h-[500px] bg-white flex flex-col items-center justify-center rounded-[16px]">
        <button
          className="absolute right-[20px] top-[20px]"
          onClick={closeModal}
        >
          <Close />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-[23px] font-bold text-center mb-[15px]">
            <span className="block">모집 마감 하시면</span>이 프로젝트가 바로
            진행이 됩니다!
          </h1>
          <p className="block">
            수락되어 있는 팀원은{" "}
            <span className="font-bold text-[18px] text-blue mx-[2px]">
              {applyCompletionUserCount?.acceptedAppliesCount}
            </span>
            명입니다.
          </p>
          <p className="text-center mb-[17px]">우리 팀원들이 맞나요?</p>
          <Duo className="mb-[30px]" />
          <div className="flex gap-[20px]">
            <button
              className="w-[200px] rounded-[10px] h-[70px] border border-blue3 text-blue3 text-[20px] font-bold mb-[15px]"
              onClick={routeAppliedUserList}
            >
              신청자 목록 보기
            </button>
            <button
              className={classNames(
                "w-[200px] rounded-[10px] h-[70px] bg-blue3 text-white text-[20px] font-bold",
                {
                  "pointer-events-none lg:bg-gray3":
                    applyCompletionUserCount?.acceptedAppliesCount === 0,
                },
              )}
              onClick={completeRecruitStartProject}
            >
              모집 마감하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitCompletionModal;
