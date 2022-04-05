import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";

import useGetApplyRecruitUser from "../../hooks/useGetApplyRecruitUser";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";
import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";

import UserCard from "../../components/apply/UserCard";
import RecruitmentStatus from "../../components/apply/RecruitmentStatus";

function ApplyPage() {
  const navigate = useNavigate();
  const { recruitId } = useParams();
  const [isAccepted, setIsAccepted] = useState(0);

  const { data: recruitBoard, isSuccess: isSuccessRecruitBoard } =
    useGetRecruitDetailQuery(recruitId);
  const { data: userData, isSuccess: isSuccessUserData } =
    useGetUserInfoQuery();
  const { data: getAppliedUserData } = useGetApplyRecruitUser({
    recruitId,
    isAccepted,
  });

  useEffect(() => {
    if (isSuccessUserData & isSuccessRecruitBoard) {
      if (userData?.userId !== recruitBoard?.userId) {
        navigate("/recruit", { replace: true });
      }
    }
  }, [
    isSuccessUserData,
    navigate,
    recruitBoard?.userId,
    userData?.userId,
    isSuccessRecruitBoard,
  ]);

  const handleAppliedUser = () => {
    setIsAccepted(0);
  };

  const handleAcceptedUser = () => {
    setIsAccepted(1);
  };

  const projectCount = getAppliedUserData?.projectCount;

  return (
    <section className="w-full py-[80px]">
      <div className="w-[1224px] mx-auto">
        <div className="mb-[20px]">
          <button
            className={classNames(
              "font-bold text-[21px] border-transparent border-b-[3px] pb-[3px]",
              {
                "lg:border-black": !Boolean(isAccepted),
              },
            )}
            onClick={handleAppliedUser}
          >
            신청자목록
          </button>
          <span className="mx-[20px]">|</span>
          <button
            className={classNames(
              "font-bold text-[21px] border-transparent border-b-[3px] pb-[3px] ",
              {
                "lg:border-black": Boolean(isAccepted),
              },
            )}
            onClick={handleAcceptedUser}
          >
            팀원 목록
          </button>
        </div>
        <div className="flex pb-[50px] gap-[1.8%] items-start">
          <div className="w-[23.8%] p-[20px] border rounded-[8px] bg-white shadow-md ">
            <RecruitmentStatus recruitBoard={recruitBoard} />
          </div>
          <ul className="w-full flex gap-[2%] gap-y-[20px] flex-wrap rounded-[11px]  applyUserUl flex-1 ">
            {getAppliedUserData?.recruitApplies.length === 0 ? (
              <li className="w-[100%] p-[20px] border rounded-[8px] bg-white shadow-md h-[280px] text-center text-gray3 flex items-center justify-center">
                {Boolean(isAccepted)
                  ? "모집된 팀원이 없습니다."
                  : "신청 인원이 없습니다."}
              </li>
            ) : (
              getAppliedUserData?.recruitApplies.map((user, idx) => (
                <li
                  className="w-[32%] p-[20px] border rounded-[8px] bg-white shadow-md"
                  key={idx}
                >
                  <UserCard
                    key={user.recruitApplyId}
                    userTask={user.task}
                    userProfileImgUrl={user.applicant2.profileImgUrl}
                    userNickname={user.applicant2.nickname}
                    applyMessage={user.applyMessage}
                    collaborationCount={projectCount[idx]}
                    collaborationRate={user.applicant2.userReputations2}
                    isAccepted={isAccepted}
                    userId={user.applicant2.userId}
                    recruitId={recruitId}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default ApplyPage;
