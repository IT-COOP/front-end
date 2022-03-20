import React, { useEffect, useRef, useState } from "react";

function Header() {
  const [openNav, setNav] = useState(false);
  const headerNav = useRef();

  const handleOpenNav = e => {
    let currentState = openNav;
    setNav(!currentState);
    let btnLine = e.currentTarget.childNodes;
    if (!currentState) {
      btnLine[0].style.top = "50%";
      btnLine[0].style.transform = "translateY(-50%) rotate(-45deg)";
      btnLine[1].style.opacity = "0";
      btnLine[2].style.bottom = "50%";
      btnLine[2].style.transform = "translateY(50%) rotate(45deg)";
    } else {
      btnLine[0].style.top = "0";
      btnLine[0].style.transform = "translateY(0%) rotate(0deg)";
      btnLine[1].style.opacity = "1";
      btnLine[2].style.bottom = "0";
      btnLine[2].style.transform = "translateY(0) rotate(0)";
    }
  };
  useEffect(() => {
    if (openNav) {
      headerNav.current.style.right = "0";
    } else {
      headerNav.current.style.right = "-100%";
    }
  }, [openNav]);

  return (
    <header className="fixed z-[999] flex items-center justify-between w-full p-[20px] bg-white">
      <div>LOGO</div>
      <button
        onClick={handleOpenNav}
        className="relative z-10 w-[23px] h-[17px] p-[5px] "
      >
        <span className="block absolute w-full left-0 top-0 h-[3px] bg-black duration-500"></span>
        <span className="block absolute w-full left-0 top-[50%] -translate-y-[50%] h-[3px] bg-black duration-500"></span>
        <span className="block absolute w-full left-0 bottom-0 h-[3px] bg-black duration-500"></span>
      </button>
      <nav
        ref={headerNav}
        className="fixed top-0 -right-[100%] w-screen h-screen bg-[rgba(0,0,0,.7)] duration-500"
      >
        <ul className="relative float-right sm:w-[226px] h-full bg-white">
          <ul>
            <li>HOME</li>
            <li>협업 게시판</li>
            <li>정보공유 게시판</li>
            <li>마이페이지</li>
          </ul>
          <button className="absolute bottom-0 right-0">로그인</button>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
