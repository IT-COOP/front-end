import React from "react";

import RecruitBoardList from "../../components/recruit/RecruitBoardList";
import RecruitFilterBar from "../../components/recruit/RecruitFilterBar";
import RecruitArrayBar from "../../components/recruit/RecruitArrayBar";

function Recruit() {
  return (
    <section className="w-full">
      <div className="w-full mx-auto text-center border-b-[1px]">
        <img src="images/banner.png" alt="banner" className="mx-auto" />
      </div>
      {/* 배너 컴포넌트로 */}
      <RecruitFilterBar />
      <RecruitArrayBar />
      <RecruitBoardList />
    </section>
  );
}

export default Recruit;
