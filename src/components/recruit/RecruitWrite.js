import React from "react";

function RecruitWrite() {
  return (
    <>
      <h1 className="text-[24px] mb-[60px]">모집글 작성하기</h1>
      <ul>
        <li className="flex items-center mb-[60px]">
          <p className="w-[208px] text-[22px]"> 제목 </p>
          <input
            className="text-[36px] py-[10px] px-[18px] flex-1 bg-slate-400"
            maxLength={20}
            type="text"
          />
        </li>
        <li className="flex items-center mb-[30px]">
          <p className="w-[208px] text-[22px]"> 예상 소요 주 </p>
          <select className="border-[1px] border-black px-[20px] w-[392px] text-[18px] h-[40px]">
            <option>1주</option>
            <option>2주</option>
            <option>3주</option>
            <option>4주</option>
            <option>5주</option>
            <option>6주</option>
            <option>7주</option>
          </select>
        </li>
        <li className="flex items-center mb-[100px]">
          <p className="w-[208px] text-[22px]">필요 직군</p>
          <select className="border-[1px] border-black px-[20px] w-[392px] text-[18px] h-[40px]">
            <option>프론트엔드</option>
            <option>백엔드</option>
            <option>디자이너</option>
            <option>기획자</option>
          </select>
          <div className="flex items-center mx-[24px]">
            <p className="text-[22px] mr-[23px]">모집인원</p>
            <select className="border-[1px] border-black px-[20px] w-[184px] text-[18px] h-[40px]">
              <option>1명</option>
              <option>2명</option>
            </select>
          </div>
          <button>추가 작성하기 +</button>
        </li>
        <li className="flex items-center ">
          <p className="w-[208px] text-[22px]">지역</p>
          <select className="border-[1px] border-black px-[20px] w-[392px] text-[18px] h-[40px]">
            <option>서울/수도권</option>
          </select>
        </li>
        <hr className="my-[30px] border-[#C4C4C4]"></hr>
        <li className="flex pb-[60px]">
          <p className="w-[208px] text-[22px]"> 내용 </p>
        </li>
        <li className="flex mt-[70px] mb-[50px]">
          <p className="w-[208px] text-[22px]">모집공고 이미지</p>
          <ul>
            <li className="flex">
              <img
                className="w-[288px] h-[186px] mr-[16px]"
                src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
                alt="썸네일 이미지"
              />
              <div>
                <label
                  className="block rounded-[5px] px-[15px] py-[6px] mb-[8px] bg-[#C4C4C4] cursor-pointer"
                  htmlFor="thumbnail"
                >
                  이미지 등록
                </label>
                <button className="block rounded-[5px] px-[15px] py-[6px] bg-[#C4C4C4]">
                  이미지 삭제
                </button>
                <input id="thumbnail" className="hidden" type="file" />
              </div>
            </li>
            <li>썸네일로 들어갈 이미지에요 (권장사이즈 288 * 186px)</li>
          </ul>
        </li>
      </ul>
      <div className="text-right mb-[100px]">
        <button className="rounded-[5px] mr-[24px] text-[22px] px-[15px] py-[6px] bg-black text-white">
          글 등록하기
        </button>
        <button className="rounded-[5px] bg-[#C4C4C4] text-[22px] px-[15px] py-[6px]">
          취소
        </button>
      </div>
    </>
  );
}

export default RecruitWrite;
