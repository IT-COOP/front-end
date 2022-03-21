import React from "react";
import { Camera } from "../../assets/icons/";

function Edit() {
  return (
    <>
      <h1 className="leading-tight lg:font-medium lg:text-[24px] lg:mb-[75px]">
        프로필 수정
      </h1>
      <div className="block lg:flex">
        <div className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] lg:mr-[98px] relative">
          <img
            src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
            alt="user profile"
            className="object-cover w-full h-full rounded-full"
          />
          <button className="absolute bottom-0 right-0 w-[34px] h-[34px] bg-white rounded-full flex justify-center items-center border border-solid border-[#cccccc]">
            <Camera />
          </button>
        </div>
        <form>
          <label htmlFor="nickname">
            <h2>닉네임</h2>
            <input type="text" id="nickname" />
            <span>Itcoop 에서 사용되는 닉네임 입니다.</span>
          </label>
          <div>
            <p>직군과 스택을 설정해주세요</p>
            <div className="lg:flex lg:items-center">
              <h2 className="lg:mr-[27.5px]">직군</h2>
              {/* 3개 중 택 일 */}
              <ul className="lg:flex lg:gap-x-[14.5px]">
                <li>프론트엔드</li>
                <li>백엔드</li>
                <li>디자인</li>
              </ul>
            </div>
            <label htmlFor="technologyStack" className="lg:flex lg:items-start">
              <h2 className="lg:mr-[27.5px]">스택</h2>
              <select id="technologyStack">
                <option>태그 선택</option>
                <option>태그 선택2</option>
                <option>태그 선택3</option>
                <option>태그 선택4</option>
                <option>태그 선택5</option>
                <option>태그 선택6</option>
                <option>태그 선택7</option>
                <option>태그 선택8</option>
                <option>태그 선택9</option>
              </select>
            </label>
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
        </form>
      </div>
    </>
  );
}
export default Edit;
