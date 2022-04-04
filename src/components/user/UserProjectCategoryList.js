import classNames from "classnames";
import React from "react";

const CATEGORY_LIST = [
  { slug: "running", name: "진행중", max: 1 },
  { slug: "applied", name: "신청중", max: 1 },
  { slug: "recruiting", name: "모집중", max: 1 },
  { slug: "over", name: "진행완료", max: 220 },
];

const currentUserCategoryList = CATEGORY_LIST.slice(1);
const targetUserCategoryList = [
  ...CATEGORY_LIST.slice(0, 1),
  ...CATEGORY_LIST.slice(2),
];

function UserProjectCategoryList({
  isCurrentUserPage,
  onCategorySelected,
  activeSlug,
}) {
  const renderedCategoryList = isCurrentUserPage
    ? currentUserCategoryList
    : targetUserCategoryList;

  return (
    <ul className="flex w-full">
      {renderedCategoryList.map(({ name, slug }, index) => {
        return (
          <li
            key={name}
            onClick={onCategorySelected(slug)}
            className={classNames(
              "flex-1 text-center text-[17px] pb-[9px] cursor-pointer flex justify-center",
              {
                "border-b-[5px] border-blue3 text-blue3": slug === activeSlug,
              },
            )}
          >
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default UserProjectCategoryList;
