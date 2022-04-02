import React from "react";

import { Close } from "../../../assets/icons";

const RecruitCompletionModal = () => {
  return (
    <section className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <div className="w-[800px] h-[500px] bg-white flex flex-col items-center justify-center rounded-[16px]">
        <div>
          <h1>
            <span className="block">모집 마감 하시면</span>이 프로젝트가 바로
            진행이 됩니다!
          </h1>
          <p>
            <span className="block">수락되어 있는 팀원은 6명입니다.</span>
            우리 팀원들이 맞나요?
          </p>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default RecruitCompletionModal;
