import React from "react";
import {
  getExperienceAmount,
  getCrown,
  getRemainingCount,
} from "../../../lib/crown";

import { BronzeCrown, SilverCrown, GoldCrown } from "../../../assets/icons";

const crownComponentByName = {
  none: null,
  bronze: BronzeCrown,
  silver: SilverCrown,
  gold: GoldCrown,
};

const nextCrownComponentByName = {
  none: BronzeCrown,
  bronze: SilverCrown,
  silver: GoldCrown,
  gold: null,
};

const nextCrownByName = {
  none: "브론즈",
  bronze: "실버",
  silver: "골드",
};

function ProjectCount({ isCurrentUserPage, projectCount }) {
  const crownName = getCrown(projectCount);

  const remainingCount = getRemainingCount(projectCount);
  const experienceAmount = getExperienceAmount(projectCount);

  const CrownComponent = crownComponentByName[crownName] ?? null;
  const NextCrownComponent = nextCrownComponentByName[crownName] ?? null;

  return isCurrentUserPage ? (
    <div className="w-[288px] p-[20px] pb-4 bg-white border-[1px] border-gray2 rounded-[8px] mt-[24px]">
      <div className="flex justify-between">
        <div className="flex">
          <p className="text-[17px] mr-[9px] font-medium">협업한 횟수</p>
          {CrownComponent && (
            <CrownComponent
              width={20}
              height={16}
              className="relative top-[1px]"
            />
          )}
        </div>
        <p className="text-[17px] text-blue3">{projectCount}회</p>
      </div>
      {projectCount === 0 ? (
        <div className="mt-[22px] pb-[28px] text-[#999] text-[13px]">
          <p>아직 협업 횟수가 없군요!</p>
          <p>다른 사람들과 함께 프로젝트를 진행해보세요!</p>
        </div>
      ) : (
        <>
          <div>
            <div className="mt-[25px] mb-[17px] flex items-center">
              <div className="w-full h-[8px] bg-white2 rounded-[4px] relative">
                <span
                  style={{
                    width: `${experienceAmount}%`,
                    willChange: "width",
                    transition: "width 300ms ease-in-out",
                  }}
                  className="h-[8px] bg-blue2 absolute inset-0 rounded-[4px]"
                />
              </div>
              {NextCrownComponent && (
                <NextCrownComponent
                  width={20}
                  height={16}
                  className="relative shrink-0 top-[1px] ml-[9px]"
                />
              )}
            </div>
          </div>
          <div className="text-[#999]">
            {crownName === "gold" ? (
              <span className="text-blue3">모든 왕관을 다 얻으셨어요!</span>
            ) : (
              <>
                <span className="text-blue3">{remainingCount}번</span> 더
                협업하면
                <br />
                {nextCrownByName[crownName]} 왕관을 얻을 수 있어요!
              </>
            )}
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="w-[288px] bg-white border-[1px] border-gray2 rounded-[8px] p-[20px] flex justify-between mt-[24px]">
      <div className="flex">
        <p className="text-[17px] mr-[9px] font-medium">협업한 횟수</p>
        {CrownComponent && (
          <CrownComponent
            width={20}
            height={16}
            className="relative top-[1px]"
          />
        )}
      </div>
      <p className="text-[17px] text-blue3">{projectCount}회</p>
    </div>
  );
}

export default ProjectCount;
