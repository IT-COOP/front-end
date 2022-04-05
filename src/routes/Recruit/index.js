import React from "react";

import RecruitBanner from "../../components/recruit/RecruitBanner";
import RecruitBoardList from "../../components/recruit/RecruitBoardList";

function Recruit() {
  return (
    <section className="w-full">
      <RecruitBanner />
      <RecruitBoardList />
    </section>
  );
}

export default Recruit;
