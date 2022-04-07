import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section>
      <img
        src="https://d2g3jmj866i7dj.cloudfront.net/images/LandingTop.png"
        alt="랜딩 이미지"
        className="w-screen min-w-[1224px]"
      />
      <div className="flex flex-col items-center py-[120px]">
        <p className="text-[31px] text-center mb-[27px] font-bold landing">
          스타트업씬처럼 열정적이고 자생적인 <br />
          프로젝트 생태계를 지향합니다.
        </p>
        <p className="leading-[45px] mb-[65px] text-[26px] font-bold landing">
          이 모든 과정은 무료로 진행됩니다!
        </p>
        <Link to="/recruit">
          <button className="w-[600px] font-bold text-[22px] rounded-[10px] bg-blue3 text-white py-[16px]">
            모집중인 프로젝트 둘러보기
          </button>
        </Link>
      </div>
      <img
        src="https://d2g3jmj866i7dj.cloudfront.net/images/LandingBottom.png"
        alt="랜딩 이미지"
        className="w-screen min-w-[1224px]"
      />
    </section>
  );
};

export default LandingPage;
