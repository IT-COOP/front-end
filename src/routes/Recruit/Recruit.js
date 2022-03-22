import React from "react";

import RecruitBoardList from "../../components/recruit/RecruitBoardList";
import RecruitFilterBar from "../../components/recruit/RecruitFilterBar";
import RecruitArrayBar from "../../components/recruit/RecruitArrayBar";

function Recruit() {
  return (
    <section className="w-[1224px] mx-[auto]">
      <RecruitFilterBar />
      <div className="w-full h-[272px] bg-pink relative">
        <div className="absolute top-0 -left-[50%] w-screen h-full bg-slate-400"></div>
      </div>
      <RecruitArrayBar />
      <RecruitBoardList />
    </section>
  );
}

export default Recruit;
