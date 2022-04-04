import React, { useState } from "react";
import { useQueryClient } from "react-query";
import useCancelApplyRecruitMutation from "../../../hooks/useCancelApplyRecruitMutation";

import classNames from "classnames";
import { Dot } from "../../../assets/icons";

function CancelApplyTooltip({ info }) {
  const client = useQueryClient();
  const [isActive, setIsActive] = useState(false);
  const { mutateAsync } = useCancelApplyRecruitMutation();

  const handleUnionClick = e => {
    e.stopPropagation();
    setIsActive(prev => !prev);
  };

  const handleMouseLeave = e => {
    e.stopPropagation();
    setIsActive(false);
  };

  const handleTooltipClick = async e => {
    e.stopPropagation();
    const { recruitApplyId: applyId, recruitPostId: recruitId } = info;

    try {
      const { success } = await mutateAsync({ applyId, recruitId });

      if (success) {
        await client.invalidateQueries(["userInfo", "currentUser"]);
        await client.invalidateQueries(["appliedProjectList", "currentUser"]);
      }
    } catch (error) {
      alert("알 수 없는 오류가 발생하였습니다.");
      console.error(error);
    } finally {
      setIsActive(false);
    }
  };

  return (
    <div className="relative w-4 h-4">
      <Dot onClick={handleUnionClick} />
      <div
        role="button"
        onMouseLeave={handleMouseLeave}
        onClick={handleTooltipClick}
        className={classNames(
          "absolute bottom-0 -translate-x-[67%] translate-y-[70px] w-[106px] h-[50px] bg-white flex justify-center items-center border border-gray5 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-[4px] text-[15px] text-blue3 font-medium",
          {
            hidden: !isActive,
          },
        )}
      >
        <div
          className={classNames(
            "absolute bottom-full w-0 h-0 left-[75%] border-[5px] border-b-[10px] border-t-transparent border-r-transparent border-b-white border-l-transparent z-10",
            {
              hidden: !isActive,
            },
          )}
        />
        <div
          className={classNames(
            "absolute left-[74%] bottom-[100.5%] border-[6px] border-b-[12px] border-t-transparent border-r-transparent border-b-gray5 border-l-transparent",
            {
              hidden: !isActive,
            },
          )}
        />
        신청취소
      </div>
    </div>
  );
}

export default CancelApplyTooltip;
