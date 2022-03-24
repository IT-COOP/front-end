import React from "react";
import { Link } from "react-router-dom";

import { Heart } from "../../assets/icons";

function UserPage() {
  return (
    <section className="w-full bg-[#f8f8f8] pt-[148px]">
      <div className="w-[1224px] mx-auto">
        <div className="flex justify-between mb-[13px]">
          <h1 className="text-[21px] font-[700] leading-[26x]]">마이페이지</h1>
          <button className="text-[19px] font-[500] bg-blue2 px-[17px] py-[6px] rounded-[5px] text-white">
            프로필 수정하기
          </button>
        </div>
        <ul className="flex gap-[24px]">
          {/* 마이페이지 왼쪽 */}
          <li>
            <ul className="w-[288px] h-[546px] bg-white border-[1px] border-gray2 rounded-[8px] px-[20px]">
              <li className="flex flex-col justify-center w-full mt-[45px] mb-[23px]">
                <img
                  alt="유저 프로필"
                  src=""
                  className="mx-auto rounded-full overflow-hidden w-[140px] h-[140px] bg-[#c0c0c0] mb-[20px]"
                />
                <div className="flex flex-col justify-center ">
                  <div className="flex mx-auto gap-x-[17px] mb-[17px]">
                    <p className=" text-19px">태영</p>
                    <p className="text-gray4 text-[15px]">프론트엔드</p>
                  </div>
                  <ul className="flex mx-auto gap-x-[5px] mb-[24px]">
                    <li className="bg-blue text-[15px] px-[14px] py-[2px] rounded-[11px] text-white">
                      React
                    </li>
                    <li className="bg-blue text-[15px] px-[14px] py-[2px] rounded-[11px] text-white">
                      Vue
                    </li>
                  </ul>
                  <div>
                    <p className="text-[15px] mb-[9px]">
                      <Heart className="inline" /> 재협업희망률 100%
                    </p>
                    <p className="pl-[15px] text-[15px] text-gray4">
                      7명 중 7명이 만족
                    </p>
                  </div>
                </div>
              </li>
              <hr className="w-[278px] block border-gray2 -ml-[16px] mt-[19px] mb-[24px]"></hr>
              <li>
                <p className="mb-[9px] text-[17px]">
                  팀 채팅방
                  <span className="text-[11px] rounded-[8.5px] px-[6px] text-white bg-gray4">
                    OFF
                  </span>
                  <span className="text-[11px] rounded-[8.5px] px-[6px] text-white bg-blue">
                    ON
                  </span>
                </p>
                <p className="text-[#999] text-[15px]">
                  아직 진행중인 프로젝트가 없습니다.
                </p>
              </li>
            </ul>
            <div className="w-[288px] h-[137px] bg-white border-[1px] border-gray2 rounded-[8px] pt-[20px] px-[20px] mt-[24px]">
              <div className="flex justify-between">
                <p className="text-[17px]">협업한 횟수</p>
                <p className="text-[17px] text-blue2">2회</p>
              </div>
              <div>
                <div className="mt-[17px] mb-[14px]">
                  <span className="block w-[212px] h-[8px] bg-[#F8F9FD] rounded-[4px] overflow-hidden">
                    <span className="block w-[70%] h-[8px] bg-blue2"></span>
                  </span>
                </div>
              </div>
              <div className="text-[#999]">
                <span className="text-blue2">1번</span> 더 협업하면
                <br />
                실버 왕관을 얻을 수 있어요!
              </div>
            </div>
          </li>
          <li className="flex-1 w-[912px]">
            <div className="w-full bg-white p-[30px] border-[1px] border-gray2 rounded-[8px] mb-[42px]">
              <div className="mb-[36px]">
                <p className="text-[17px] mb-[22px]">포트폴리오</p>
                <a
                  className="pl-[14px] text-blue2 underline text-[15px]"
                  href="https://www.naver.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  ㅇㅇㅇ
                </a>
              </div>
              <div className="">
                <p className="mb-[22px] text-[17px]">소개글</p>
                <p className="pl-[14px] text-[15px]">2조 조장입니다</p>
              </div>
            </div>
            <div>
              <p className="text-[17px] mb-[29px]">나의 프로젝트</p>
              <ul className="flex w-full">
                <li className="flex-1 text-center text-[17px] pb-[9px] border-b-[5px] border-black">
                  진행중
                </li>
                <li className="flex-1 text-center text-[17px] pb-[9px]">
                  신청중
                </li>
                <li className="flex-1 text-center text-[17px] pb-[9px]">
                  모집중
                </li>
                <li className="flex-1 text-center text-[17px] pb-[9px]">
                  진행완료
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default UserPage;
