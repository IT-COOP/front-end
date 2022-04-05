import React, { useState } from "react";
import { useQueryClient } from "react-query";
import classNames from "classnames";

import { KeepItDetail, KeepItDetailActive } from "../../../assets/icons";

import useDeleteRecruitBoardKeepItMutation from "../../../hooks/useDeleteRecruitBoardKeepItMutation";
import useRecruitBoardKeepItMutation from "../../../hooks/useRecruitBoardKeepItMutation";

function KeepItButton({ recruitId, keepId }) {
  const [isKeepItModal, setIsKeepItModal] = useState(false);
  const { mutateAsync: keepItRecruitBoard } = useRecruitBoardKeepItMutation();
  const { mutateAsync: deleteKeepItRecruitBoard } =
    useDeleteRecruitBoardKeepItMutation();
  const queryClient = useQueryClient();

  const addRecruitBoardKeepIt = async () => {
    const { success } = await keepItRecruitBoard(recruitId);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
      setIsKeepItModal(true);
      setTimeout(() => {
        setIsKeepItModal(false);
      }, 500);
    }
  };

  const deleteRecruitBoardKeepIt = async () => {
    const { success } = await deleteKeepItRecruitBoard({ recruitId, keepId });
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  return (
    <div>
      {keepId ? (
        <button
          className="relative text-[19px] border-[1px] border-blue3 py-[6px] text-center w-[138px] text-blue3 rounded-[5px] mr-[9px]"
          onClick={deleteRecruitBoardKeepIt}
        >
          <KeepItDetailActive className="inline-block " />
          <span className="px-[15px] pl-[5px]">Keep It</span>
          <div
            className={classNames(
              "absolute border-[1px] pointer-events-none mt-[25px] text-[14px] transition-opacity opacity-0 text-white -right-[0px] leading-[40px] rounded-[10px] bg-blue3 text-center w-[222px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] duration-700",
              { "opacity-100": isKeepItModal },
            )}
          >
            게시물이 Keep It 되었어요!
            <div className="absolute border-t-[1px] border-l-[1px] -top-[9px] right-[55px] border-gray2  w-[16px] h-[16px] bg-blue3 rotate-45"></div>
          </div>
        </button>
      ) : (
        <button
          className="text-[19px] border-[1px] border-blue3 py-[6px] text-center w-[138px] text-blue3 rounded-[5px] mr-[9px]"
          onClick={addRecruitBoardKeepIt}
        >
          <KeepItDetail className="inline-block " />
          <span className="px-[15px] pl-[5px]">Keep It</span>
        </button>
      )}
    </div>
  );
}

export default KeepItButton;
