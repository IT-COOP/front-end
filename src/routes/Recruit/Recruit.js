import React from "react";

import RecruitBoardList from "../../components/recruit/RecruitBoardList";
import RecruitFilterBar from "../../components/recruit/RecruitFilterBar";
import RecruitArrayBar from "../../components/recruit/RecruitArrayBar";

function Recruit() {
  return (
    <section className="w-[1224px] mx-[auto]">
      <RecruitFilterBar />
      <div className="w-full h-[272px] bg-pink"></div>
      <RecruitArrayBar />
      <RecruitBoardList />
    </section>
  );
}

export default Recruit;
