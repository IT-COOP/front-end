import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";

import useModifyUserMutation from "../../hooks/useModifyUserMutation";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";

import EditUserImage from "../../components/user/edit/EditUserImage";
import EditUserInformationWrapper from "../../components/user/edit/EditUserInformationWrapper";
import UserNickname from "../../components/user/edit/UserNickname";
import EditUserTaskAndStack from "../../components/user/edit/EditUserTaskAndStack";
import EditUserPortfolioURL from "../../components/user/edit/EditUserPortfolioURL";
import EditUserSelfIntroduction from "../../components/user/edit/EditUserSelfIntroduction";

function Edit({
  currentUserId,
  portfolioUrl,
  profileImgUrl,
  selfIntroduction,
  task,
  stackList,
  nickname,
}) {
  const client = useQueryClient();
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetUserInfoQuery();
  const { mutateAsync } = useModifyUserMutation();
  const [changedProfile, setChangedProfile] = useState({
    stackList,
    task,
    profileImgUrl,
    selfIntroduction: selfIntroduction ?? "",
    portfolioUrl,
  });

  useEffect(() => {
    if (!isLoading) {
      if (currentUserId !== userData.userId) {
        document.querySelector("main").classList.add("hidden");
        Swal.fire({
          title: "잘못 된 접근 입니다!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then(() => {
          navigate("/recruit");
        });
      }
    }
    return () => {
      document.querySelector("main").classList.remove("hidden");
    };
  }, [currentUserId, isLoading, navigate, userData.userId]);

  const handleProfileChangeByKeyName = keyName => newArg => {
    setChangedProfile(previous => {
      return {
        ...previous,
        [keyName]: newArg,
      };
    });
  };

  const handleSubmit = async () => {
    const technologyStack =
      changedProfile.stackList.join(",") + "," + String(task);
    const variables = {
      technologyStack,
      profileImgUrl: changedProfile.profileImgUrl,
      selfIntroduction: changedProfile.selfIntroduction,
      portfolioUrl: changedProfile.portfolioUrl,
    };

    const response = await mutateAsync(variables);
    if (response.profile) {
      await client.invalidateQueries(["userInfo", "currentUser"]);
    }
    navigate(`/user/${currentUserId}`, { replace: true });
  };

  return (
    <section className="h-screen w-[1224px] mx-auto">
      <h1 className="mt-[66px] mb-[76px] font-bold text-[21px]">프로필 수정</h1>
      <div className="flex gap-x-[98px]">
        <EditUserImage
          profileImgUrl={profileImgUrl}
          nickname={nickname}
          onChange={handleProfileChangeByKeyName("profileImgUrl")}
        />
        <EditUserInformationWrapper>
          <UserNickname nickname={nickname} />
          <div>
            <p className="mb-[27px] font-medium text-[17px]">
              직군과 스택을 설정해주세요
            </p>
            <EditUserTaskAndStack
              task={changedProfile.task}
              stackList={changedProfile.stackList}
              onTaskChange={handleProfileChangeByKeyName("task")}
              onStackChange={handleProfileChangeByKeyName("stackList")}
            />
          </div>
          <hr className="w-full mt-[30px] mb-[37px] bg-gray2" />
          <EditUserPortfolioURL
            portfolioUrl={changedProfile.portfolioUrl}
            onPortfolioUrlChange={handleProfileChangeByKeyName("portfolioUrl")}
          />
          <EditUserSelfIntroduction
            selfIntroduction={changedProfile.selfIntroduction}
            onSelfIntroductionChange={handleProfileChangeByKeyName(
              "selfIntroduction",
            )}
          />
          <button
            onClick={handleSubmit}
            className="w-[180px] h-[40px] text-center text-white bg-blue3 font-medium text-[19px] rounded-[5px]"
          >
            수정 완료
          </button>
        </EditUserInformationWrapper>
      </div>
    </section>
  );
}
export default Edit;
