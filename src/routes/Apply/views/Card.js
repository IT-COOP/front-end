import React from "react";

function Card() {
  return (
    <>
      <div className="w-[288px] p-[20px] border rounded-[8px] h-[329px] border-[rgba(0,0,0,.1)]">
        <div className="flex gap-[20px] mb-[15px]">
          <img
            src={
              "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg"
            }
            alt="유저 프로필"
            className="w-[90px] h-[90px] overflow-hidden rounded-full"
          />
          <div>
            <p className="font-bold text-[19px] mb-[20px]">최대여섯글자</p>
            <div>
              <p className="text-[13px] text-gray4">협업 2회</p>
              <p className="text-[13px] text-gray4">재협업희망률 xx%</p>
            </div>
          </div>
        </div>
        <p className="inline-block text-white bg-blue py-[3px] px-[10px] text-[14px] rounded-[11px] mb-[20px]">
          Ruby on Rails
        </p>
        <p className="text-[14px] p-[12px] bg-gray1 rounded-[5px] leading-[20px] h-[70px] mb-[40px]">
          당부하는건최대이십글자입니다화이팅이조다
        </p>
        <div className="flex justify-between">
          <button className="w-[115px] leading-[30px] text-[14px] rounded-[5px] bg-blue3 text-white">
            수락
          </button>
          <button className="w-[115px] leading-[30px] text-[14px] rounded-[5px] bg-white border border-blue3 text-blue3">
            거절
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
