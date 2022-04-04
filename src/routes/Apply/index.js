import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";

import AppliedUserList from "./views/AppliedUserList";

import useGetApplyRecruitUser from "../../hooks/useGetApplyRecruitUser";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";
import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";

function ApplyPage() {
  const navigate = useNavigate();
  const { recruitId } = useParams();
  const [isAccepted, setIsAccepted] = useState(0);

  const { data: recruitBoard, isSuccess: isSuccessRecruitBoard } =
    useGetRecruitDetailQuery(recruitId);
  const { data: userData, isSuccess: isSuccessUserData } =
    useGetUserInfoQuery();
  const { data: getUserData } = useGetApplyRecruitUser({
    recruitId,
    isAccepted,
  });

  useEffect(() => {
    if (isSuccessUserData & isSuccessRecruitBoard) {
      if (userData?.userId !== recruitBoard?.userId) {
        navigate("/", { replace: true });
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
        <p></p>
        <ul className="w-full flex gap-[2%] gap-y-[20px] flex-wrap rounded-[11px] mt-[50px]  applyUserUl">
          <AppliedUserList
            user={getUserData?.data.recruitApplies}
            isAccepted={isAccepted}
            recruitId={recruitId}
          />
        </ul>
      </div>
    </section>
  );
}
export default ApplyPage;
