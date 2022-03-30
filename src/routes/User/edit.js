import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";

import EditUserImage from "./views/edit/EditUserImage";
import EditUserInformationWrapper from "./views/edit/EditUserInformationWrapper";
import UserNickname from "./views/edit/UserNickname";
import EditUserTaskAndStack from "./views/edit/EditUserTaskAndStack";
import useGetUserDetailsQuery from "../../hooks/useGetUserDetailsQuery";

function Edit() {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetUserInfoQuery();
  const { data: userDetails } = useGetUserDetailsQuery(id, true, {
    enabled: data?.userInfo?.userId === id,
  });
  console.log(data);
  console.log(userDetails);

  const [changedProfile, setChangedProfile] = useState({
    stack: null,
    task: null,
    profileImgUrl: null,
    selfIntroduction: null,
    portfolioUrl: null,
  });

  const handleProfileChangeByKeyName = keyName => newArg => {
    setChangedProfile(previous => {
      return {
        ...previous,
        [keyName]: newArg,
      };
    });
  };

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <Navigate replace to="/" />;
  }

  return (
    <section className="h-screen w-[1224px] mx-auto">
      <h1 className="mt-[66px] mb-[76px] font-bold text-[21px]">프로필 수정</h1>
      <div className="flex gap-x-[98px]">
        <EditUserImage
          onChange={handleProfileChangeByKeyName("profileImgUrl")}
        />
        <EditUserInformationWrapper>
          <UserNickname />
          <div>
            <p className="mb-[27px] font-medium text-[17px]">
              직군과 스택을 설정해주세요
            </p>
            <EditUserTaskAndStack
              changedTask={changedProfile.task}
              changedStack={changedProfile.stack}
              onTaskChange={handleProfileChangeByKeyName("task")}
              onStackChange={handleProfileChangeByKeyName("stack")}
            />

            <div>
              <span>스택</span>
              <div className="relative">
                <div className="w-[412px] py-[15px] pl-[17px] pr-[7px]">
                  태그 선택
                </div>
              </div>
            </div>
          </div>
          <hr className="lg:w-full lg:mt-[30px] lg:mb-[37px] lg:bg-[#c4c4c4]" />
          <label htmlFor="portfolio">
            <h2>포트폴리오</h2>
            <input type="text" placeholder="URL" id="portfolio" />
          </label>
          <label htmlFor="introduction">
            <h2>소개글</h2>
            <textarea id="introduction" maxLength={300} />
          </label>
          <button type="submit">수정 완료</button>
        </EditUserInformationWrapper>
      </div>
    </section>
  );
}
export default Edit;
