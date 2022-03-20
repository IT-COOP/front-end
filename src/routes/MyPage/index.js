import React from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

function MyPage() {
  const isFullWeb = useMediaQuery("(min-width: 960px)");
  console.log(isFullWeb);

  return (
    <>
      <section className="flex justify-between items-center h-[75px] mx-[20px] lg:mx-0">
        <h1 className="font-bold text-[22px] leading-[26px]">마이페이지</h1>
        {isFullWeb ? <button>프로필 수정하기 </button> : null}
      </section>
      <div className="block lg:flex lg:gap-x-[24px]">
        <div className="lg:h-[546px] lg:w-[289px] lg:shrink-0 lg:bg-red-50 lg:sticky lg:top-0">
          <div className="border-b border-b-solid border-b-slate-200">
            <section>
              <div className="px-[20px] flex lg:flex-col lg:justify-center lg:items-center">
                <img
                  src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
                  alt="profile"
                  className="w-[100px] h-[100px] rounded-full object-cover mr-[30px] lg:mr-0 lg:w-[140px] lg:h-[140px] lg:mb-[24px] lg:mt-[45px]"
                />
                <article className="py-[10px] lg:py-0 lg:block">
                  <div className="lg:flex lg:items-center lg:m-auto">
                    <h2 className="inline-block font-bold text-[20px] leading-tight mb-[4px] lg:mb-0 lg:text-[22px] lg:font-medium lg:text-right lg:basis-1/2 lg:pr-[7px]">
                      태영
                    </h2>
                    <h2 className="text-[#797979] text-[14px] leading-tight lg:text-[15px] lg:basis-1/2 lg:text-center">
                      백엔드
                    </h2>
                  </div>
                  <ul className="mt-[20px] lg:mt-[12px]">
                    <li className="inline-block text-[11px] leading-tight bg-slate-200 rounded-[9px] px-[8px] py-[2px] mr-[8px] lg:text-[16px] lg:px-[10px]">
                      React
                    </li>
                    <li className="inline-block text-[11px] leading-tight bg-slate-200 rounded-[9px] px-[8px] py-[2px] lg:text-[16px] lg:px-[10px]">
                      Svelete
                    </li>
                  </ul>
                </article>
              </div>
            </section>
            {!isFullWeb ? (
              <section className="px-[20px]">
                <p className="text-[14px] my-[20px]">
                  안녕하세요 2조 조장입니다~ 사이드 프로젝트 좋아해요! 갈틱폰도
                  짱! 여기서 좋은 사람들 많이 만나고 싶어요 호호 (최대 300자까지
                  작성 가능, 엔터 문제 로직 고려해야 함)
                </p>
                {/* ICON PLACE */}
                <a
                  href="https://www.github.com/nemyung"
                  target={"_blank"}
                  rel="noreferrer"
                  className="underline text-slate-300 text-[14px] leading-tight"
                >
                  https://www.github.com/nemyung
                </a>
              </section>
            ) : null}
            <section className="px-[20px]">
              <div className="flex items-start mt-4 gap-x-2 lg:mb-[20px] lg:mt-[23px]">
                <button className="text-[14px]">아이콘</button>
                <div>
                  <p className="text-[14px]">재협업희망률 99%</p>
                  <p className="text-[13px] text-slate-300">
                    7명 중 7명이 만족
                  </p>
                </div>
              </div>

              {!isFullWeb ? (
                <button className="my-4 w-full rounded-[5px] border border-solid border-slate-200 text-[14px] py-[8px] xl:hidden">
                  프로필 수정
                </button>
              ) : null}
            </section>
          </div>
          <div className="py-[20px] px-[18px]">
            {/*
             ** TODO
             ** 1. 모바일 뷰일 때에는 전체 프로젝트에 대한 상황이 나와야 한다.
             */}
            {isFullWeb ? (
              <>
                <h3 className="text-[20px] leading-tight font-medium">
                  진행중인 프로젝트
                </h3>
                <p className="line-clamp-2 text-[15px] leading-tight mt-4 w-[190px]">
                  일상대화 챗봇기반 메타버스 플랫폼 사이드 프로젝트 하실 분 (두
                  줄까지 입력가능)일상대화 챗봇기반 메타버스 플랫폼 사이드
                  프로젝트 하실 분 (두 줄까지 입력가능)
                </p>
                <div className="mt-[40px] flex justify-between">
                  <span className="inline-block py-px px-[14px] bg-slate-700 rounded-[11px] text-white font-normal">
                    모집 완료
                  </span>
                  <div>
                    <button className="font-medium text-[14px] leading-tight">
                      보러가기
                      <span>아이콘</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-[14px] leading-tight font-bold">
                  나의 프로젝트
                </h3>
                {/* Bullet 제외, 리스트 예상 */}
                <div>
                  <p className="text-[14px] leading-tight mt-[10px] line-clamp-2">
                    일상대화 챗봇기반 메타버스 플랫폼 사이드 프로젝트 하실 분
                    (두 줄까지 입력가능)
                  </p>
                  <div className="flex items-center mt-[6px]">
                    <p className="text-[12px] leading-tight text-[#797979]">
                      진행중
                    </p>
                    <div className="w-[0.5px] h-[10px] bg-[#797979] mx-[6px]" />
                    <button className="text-[12px] leading-tight text-[#797979]">
                      채팅하기 아이콘
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* 우측 */}
        <div>
          {isFullWeb ? (
            <section className="hidden lg:block lg:bg-slate-50 lg:py-[45px] lg:px-[40px]">
              <ul>
                <h4 className="font-medium text-[20px] mb-4">포트폴리오</h4>
                <li className="mb-[30px]">
                  <a
                    href="https://www.github.com/nemyung"
                    target={"_blank"}
                    rel="noreferrer"
                    className="block ml-[10px] underline text-slate-300 font-medium text-[18px] leading-tight"
                  >
                    https://www.github.com/nemyung
                  </a>
                </li>
              </ul>
              <ul>
                <h4 className="font-medium text-[20px] mb-4">소개글</h4>
                <p className="font-medium ml-[10px] text-[18px] leading-tight">
                  안녕하세요 2조 조장입니다~ 사이드 프로젝트 좋아해요! 갈틱폰도
                  짱! 여기서 좋은 사람들 많이 만나고 싶어요 호호 (최대 300자까지
                  작성 가능, 엔터 문제 로직 고려해야 함)
                </p>
              </ul>
            </section>
          ) : null}
          {/* Tab */}
          <section className="flex h-[40px] xl:block mb-[20px] xl:mt-[25px] xl:mb-[30px]">
            <button className="flex items-center justify-center basis-1/2 font-medium text-[14px] leading-tight border-b-2 border-b-solid border-b-black xl:inline-block lg:h-full xl:border-0 xl:text-[24px] xl:font-bold">
              나의 XXXX It
            </button>
            {/* TODO: Add Vertical bar */}
            <div className="hidden xl:inline-block xl:h-[20px] xl:w-px xl:bg-black xl:mx-[20px]" />
            <button className="flex items-center justify-center basis-1/2 font-medium text-[14px] leading-tight text-[#797979] xl:inline-block lg:h-full xl:border-0 xl:text-[24px] xl:font-bold">
              나의 XXXX It
            </button>
          </section>
          {/* Card */}
          <ul className="px-[18px] lg:px-0 xl:px-0 flex flex-wrap gap-[10px] xl:gap-[24px]">
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <li
                  key={i}
                  className="w-full md:w-[49%] xl:w-[31%] h-[356px] lg:h-[396px]"
                >
                  <img
                    src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
                    alt="recruit page"
                    className="object-cover w-full h-1/2"
                  />
                  <div className="pt-[20px] pl-[18px] pb-[11px] pr-[21px] bg-[#f9f9f9] rounded-[8px]">
                    <h4 className="line-clamp-2 font-medium text-[18px] leading-tight mb-[22px]">
                      챗봇기반 메타버스 플랫폼 사이드 프로젝트 하실 분 (두
                      줄까지 입력가능)챗봇기반 메타버스 플랫폼 사이드 프로젝트
                      하실 분 (두 줄까지 입력가능)
                    </h4>
                    <h5 className="text-[14px] leading-[17.53px] pr-[6px]">
                      서울 수도권&nbsp;&nbsp;|&nbsp;&nbsp; 3주 예상
                    </h5>
                    <ul className="flex gap-x-[6px] mt-[6px]">
                      <li className="text-[14px] leading-[17.53px] rounded-[11px] px-[8px] py-[2px] bg-[#4e4e6a] text-white">
                        백엔드
                      </li>
                      <li className="text-[14px] leading-[17.53px] rounded-[11px] px-[8px] py-[2px] bg-[#4e4e6a] text-white">
                        프론트엔드
                      </li>
                      <li className="text-[14px] leading-[17.53px] rounded-[11px] px-[8px] py-[2px] bg-[#4e4e6a] text-white">
                        디자인
                      </li>
                    </ul>
                    <ul className="mt-[18px] flex justify-between text-[12px] leading-[15px]">
                      <li className="flex text-[#777777]">
                        <p>5시간 전 | 황태영</p>
                      </li>
                      <li className="flex">
                        <p>10</p>
                        <p>10</p>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyPage;
