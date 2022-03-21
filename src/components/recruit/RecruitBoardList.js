import React from "react";

import RecruitBoard from "./RecruitBoard";

function RecruitBoardList() {
  const data = [
    {
      recruitPostId: 8,
      title: "좋은 테스트 코드 짜는 방법",
      user: {
        userId: "cgh",
        nickname: "여덟글자제한이다",
      },
      recruitContent: "IT COOP 화이팅!",
      viewCount: 0,
      recruitLocation: 1,
      recruitKeepCount: 0,
      recruitCommentCount: 0,
      recruitDurationDays: 49,
      endAt: "2022-03-15T00:08:48.000Z",
      createdAt: "2022-03-15T00:08:48.000Z",
      updatedAt: "2022-03-15T00:08:48.000Z",
      recruitKeeps: [],
      recruitTasks: [
        {
          recruitTaskId: 1,
          recruitTask: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitStacks: [
        {
          recruitStackId: 1,
          recruitStack: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitPostImages: [
        {
          recruitPostImageId: 4,
          imgUrl: "이미지 url1",
        },
      ],
      recruitDurationWeeks: 7,
    },
    {
      recruitPostId: 8,
      title: "좋은 테스트 코드 짜는 방법",
      user: {
        userId: "cgh",
        nickname: "여덟글자제한이다",
      },
      recruitContent: "IT COOP 화이팅!",
      viewCount: 0,
      recruitLocation: 1,
      recruitKeepCount: 0,
      recruitCommentCount: 0,
      recruitDurationDays: 49,
      endAt: "2022-03-15T00:08:48.000Z",
      createdAt: "2022-03-15T00:08:48.000Z",
      updatedAt: "2022-03-15T00:08:48.000Z",
      recruitKeeps: [],
      recruitTasks: [
        {
          recruitTaskId: 1,
          recruitTask: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitStacks: [
        {
          recruitStackId: 1,
          recruitStack: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitPostImages: [
        {
          recruitPostImageId: 4,
          imgUrl: "이미지 url1",
        },
      ],
      recruitDurationWeeks: 7,
    },
    {
      recruitPostId: 8,
      title: "좋은 테스트 코드 짜는 방법",
      user: {
        userId: "cgh",
        nickname: "여덟글자제한이다",
      },
      recruitContent: "IT COOP 화이팅!",
      viewCount: 0,
      recruitLocation: 1,
      recruitKeepCount: 0,
      recruitCommentCount: 0,
      recruitDurationDays: 49,
      endAt: "2022-03-15T00:08:48.000Z",
      createdAt: "2022-03-15T00:08:48.000Z",
      updatedAt: "2022-03-15T00:08:48.000Z",
      recruitKeeps: [],
      recruitTasks: [
        {
          recruitTaskId: 1,
          recruitTask: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitStacks: [
        {
          recruitStackId: 1,
          recruitStack: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitPostImages: [
        {
          recruitPostImageId: 4,
          imgUrl: "이미지 url1",
        },
      ],
      recruitDurationWeeks: 7,
    },
    {
      recruitPostId: 8,
      title: "좋은 테스트 코드 짜는 방법",
      user: {
        userId: "cgh",
        nickname: "여덟글자제한이다",
      },
      recruitContent: "IT COOP 화이팅!",
      viewCount: 0,
      recruitLocation: 1,
      recruitKeepCount: 0,
      recruitCommentCount: 0,
      recruitDurationDays: 49,
      endAt: "2022-03-15T00:08:48.000Z",
      createdAt: "2022-03-15T00:08:48.000Z",
      updatedAt: "2022-03-15T00:08:48.000Z",
      recruitKeeps: [],
      recruitTasks: [
        {
          recruitTaskId: 1,
          recruitTask: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitStacks: [
        {
          recruitStackId: 1,
          recruitStack: 3,
          numberOfPeopleRequired: 3,
          numberOfPeopleSet: 0,
        },
      ],
      recruitPostImages: [
        {
          recruitPostImageId: 4,
          imgUrl: "이미지 url1",
        },
      ],
      recruitDurationWeeks: 7,
    },
  ];
  console.log(data);
  return (
    <ul className="flex overflow-hidden mb-[20px] gap-[20px] flex-wrap w-full px-4 xl:px-[0] lg:gap-[2%] lg:gap-y-[20px] md:gap-[2%] md:gap-y-[20px] sm:px-4 sm:rounded-[8px]">
      {data.map(board => (
        <li className="flex flex-col h-[356px] overflow-hidden w-[100%] xl:w-[23.5%] lg:w-[32%] lg:h-[396px] md:w-[49%] rounded-[11px] bg-[#EBEBEB]">
          <RecruitBoard
            key={board.recruitPostId}
            recruitPostId={board.recruitPostId}
            title={board.title}
            nickname={board.user.nickname}
            recruitContent={board.recruitContent}
            recruitKeepCount={board.recruitKeepCount}
            recruitCommentCount={board.recruitCommentCount}
            recruitLocation={board.recruitLocation}
            imgUrls={board.recruitPostImages} //이미지 정보 array
            createdAt={board.createdAt}
            recruitKeeps={board.recruitKeeps} //누가 추가했는지 user의 id값이 담긴 array
            recruitStacks={board.recruitStacks} //직군에 대한 array
            recruitDurationWeeks={board.recruitDurationWeeks}
            recruitTasks={board.recruitTasks}
          />
        </li>
      ))}
    </ul>
  );
}

export default RecruitBoardList;
