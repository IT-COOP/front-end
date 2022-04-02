import React from "react";

import { Close, Mascot } from "../../../assets/icons";

// import useGetApplyRecruitUser from "../../../hooks/useGetApplyRecruitUser";
import useGetApplyCompletionRecruitUser from "../../../hooks/useGetApplyCompletionRecruitUser";
const RecruitCompletionModal = ({ recruitId }) => {
  // const { data: non } = useGetApplyRecruitUser(recruitId);
  const { data: applyCompletionUserCount } =
    useGetApplyCompletionRecruitUser(recruitId);

  return (
    <section className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <div className="relative w-[800px] h-[500px] bg-white flex flex-col items-center justify-center rounded-[16px]">
        <button className="absolute right-[20px] top-[20px]">
          <Close />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-[23px] font-bold text-center mb-[15px]">
            <span className="block">모집 마감 하시면</span>이 프로젝트가 바로
            진행이 됩니다!
          </h1>
          <p className="text-center mb-[17px]">
            <span className="block">
              수락되어 있는 팀원은{" "}
              <span className="font-bold text-[18px] text-blue mx-[2px]">
                {applyCompletionUserCount?.acceptedAppliesCount}
              </span>
              명입니다.
            </span>
            우리 팀원들이 맞나요?
          </p>
          <Mascot className="mb-[30px]" />
          <div className="flex gap-[20px]">
            <button className="w-[200px] rounded-[10px] h-[70px] border border-blue3 text-blue3 text-[20px] font-bold mb-[15px]">
              신청자 목록 보기
            </button>
            <button className="w-[200px] rounded-[10px] h-[70px] bg-blue3 text-white text-[20px] font-bold">
              모집 마감하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitCompletionModal;
