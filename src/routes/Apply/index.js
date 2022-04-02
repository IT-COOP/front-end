import React from "react";

import ApplyCompletionUserList from "./views/ApplyCompletionUserList";
import ApplyUserList from "./views/ApplyCompletionUserList";
import Card from "./views/Card";

function ApplyPage() {
  return (
    <section className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white3">
      <div className="w-[1224px] mx-auto">
        <div className="mb-[20px]">
          <button className="font-bold text-[21px]">신청자목록</button>
          <span className="mx-[20px]">|</span>
          <button className="font-bold text-[21px]">팀원 목록</button>
        </div>
        <div className="w-full bg-white h-[650px] rounded-[11px] overflow-scroll-y p-[20px]">
          <ApplyCompletionUserList />
          <ApplyUserList />
          <Card />
        </div>
      </div>
    </section>
  );
}
export default ApplyPage;
