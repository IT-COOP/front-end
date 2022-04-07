import React, { useEffect } from "react";
import { useQueryClient } from "react-query";

import { SadSmile, Smile, Close } from "../../assets/icons";
import useUserReputation from "../../hooks/useUserReputation";
import useReviewUser from "../../hooks/useReviewUser";
function UserReviewModal({ closeModal, recruitPostId }) {
  const { data: userList } = useUserReputation(recruitPostId);
  const { mutateAsync: reviewUser } = useReviewUser();
  const queryClient = useQueryClient();

  const goodUser = userId => async () => {
    const reviewData = {
      receiver: userId,
      point: 1,
      recruitPostId,
    };
    await reviewUser(reviewData);
    queryClient.invalidateQueries("Reputation");
  };

  const badUser = userId => async () => {
    const reviewData = {
      receiver: userId,
      point: 1,
      recruitPostId,
    };
    await reviewUser(reviewData);
    queryClient.invalidateQueries("Reputation");
  };

  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    return () => {
      return (document.querySelector("body").style.overflow = "auto");
    };
  });

  const closeReviewModal = () => {
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.7)] z-[999] flex items-center justify-center">
      <div className="relative w-[800px] h-[500px] bg-white rounded-[10px] p-[30px]">
        <button
          className="absolute right-[10px] top-[10px]"
          onClick={closeReviewModal}
        >
          <Close />
        </button>
        <h1 className="text-[23px] text-center font-bold mb-[20px]">
          함께 프로젝트를 진행한 우리 팀원들은?
        </h1>
        <ul className=" gap-y-[20px] overflow-y-scroll gap-x-[2%] self p-[15px] h-[380px] flex flex-wrap self">
          {userList?.map(user => (
            <li
              key={user.userId}
              className="rounded-[15px] shadow-md w-[32%] p-[20px] border h-[200px]"
            >
              <div className="flex items-center mb-[15px]">
                <img
                  src={user.profileImgUrl}
                  alt={`${user.nickname}의 프로필 사진`}
                  className="rounded-full w-[50px] h-[50px] mr-[15px]"
                />
                <p>{user.nickname}</p>
              </div>
              <div>
                <button
                  className="flex items-center text-white bg-blue3 gap-[10px] w-full px-[15px] py-[7px] mb-[10px] rounded-[10px]"
                  onClick={goodUser(user.userId)}
                >
                  {" "}
                  <Smile className="w-[25px] h-[25px]" />
                  다음에 또해요!
                </button>
                <button
                  className="flex items-center bg-white border-blue3 border gap-[10px] w-full px-[15px] py-[7px] rounded-[10px]"
                  onClick={badUser(user.userId)}
                >
                  <SadSmile className="w-[25px] h-[25px]" /> 고생하셨습니다!
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserReviewModal;
