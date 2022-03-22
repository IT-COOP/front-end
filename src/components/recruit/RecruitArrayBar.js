import React from "react";

function RecruitArrayBar() {
  const handleClickArray = e => {
    let target = e.target;
    if (target.nodeName === "BUTTON") {
      for (let key of target.parentNode.childNodes) {
        key.classList.remove("after:w-full");
        key.classList.remove("text-black");
        key.classList.add("text-gray3");
      }
      target.classList.remove("after:w-0");
      target.classList.add("after:w-full");
      target.classList.add("text-black");
    }
  };

  return (
    <ul className="sticky flex items-center my-[24px] justify-between leading-[30.05px] text-[24px]">
      <li onClick={handleClickArray}>
        <button className="mr-[40px] font-bold hover:text-black relative after:contents-[''] after:absolute after:top-[100%] after:mt-[6px]  after:left-0 after:h-[2px] after:w-full after:block after:bg-black hover:after:w-full">
          최신순
        </button>
        <button className="font-bold text-gray3 hover:text-black relative after:contents-[''] after:absolute after:top-[100%] after:mt-[6px] after:left-0 after:h-[2px] after:w-0 after:block after:bg-black hover:after:w-full">
          Keep it 많은 순
        </button>
      </li>
      <li className="font-[500]">
        <button>모집중인 글만 보기</button>
      </li>
    </ul>
  );
}

export default RecruitArrayBar;
