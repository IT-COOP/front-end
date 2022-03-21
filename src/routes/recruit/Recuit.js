import React from "react";

import RecruitBoardList from "../../components/recruit/RecruitBoardList";
import RecruitFilterBar from "../../components/recruit/RecruitFilterBar";
import RecruitWriteBtn from "../../components/recruit/RecruitWriteBtn";
import RecruitArrayBar from "../../components/recruit/RecruitArrayBar";

function Recruit() {
  return (
    <section className="pt-[80px]">
      <div className="px-[18px]">
        <h1 className="text-[22px] font-bold mb-[8px]">협업 페이지</h1>
        <p className="text-[13px] mb-[34px]">
          팀을 새로 만들거나 팀원을 구할 때, 팀을 구할 때,
          <br />
          이곳에서 다양한 직군의 협업 파트너를 만날 수 있습니다.
        </p>
      </div>
      <RecruitFilterBar />
      <RecruitArrayBar />
      <RecruitBoardList />
      <RecruitWriteBtn />
    </section>
  );
}

export default Recruit;
