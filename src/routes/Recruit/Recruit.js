import React from "react";
import { Outlet } from "react-router-dom";

import RecruitBanner from "../../components/recruit/RecruitBanner";
import RecruitBoardList from "../../components/recruit/RecruitBoardList";

function Recruit() {
  return (
    <section className="w-full">
      {/* 배너 컴포넌트로 */}
      <RecruitBanner />
      <RecruitBoardList />
    </section>
  );
}

export default Recruit;
