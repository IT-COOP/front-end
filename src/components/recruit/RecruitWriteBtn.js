import React, { useState } from "react";

function RecruitWriteBtn() {
  const [currentMedia, setMedia] = useState(true);

  window.addEventListener("resize", () => {
    let screenWidth = window.matchMedia("(max-width: 1365px)").matches;
    setMedia(screenWidth);
  });
  return (
    <>
      {currentMedia ? (
        <button className="fixed bottom-0 left-0 w-full h-[60px] bg-[#4E4E6A] text-white text-[18px]">
          모집글 쓰기
        </button>
      ) : (
        <button>모집</button>
      )}
    </>
  );
}

export default RecruitWriteBtn;
