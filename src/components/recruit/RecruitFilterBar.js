import React from "react";

function RecruitFilterBar({ handleFilter }) {
  const handleClickFilter = e => {
    let target = e.target;

    if (target.nodeName === "BUTTON") {
      for (const key of target.parentNode.childNodes) {
        key.classList.remove("after:w-full");
        key.classList.remove("text-black");
        key.classList.add("text-gray3");
      }
      target.classList.remove("text-gray3");
      target.classList.remove("after:w-0");
      target.classList.add("after:w-full");
      target.classList.add("text-black");

      handleFilter(target.innerText);
    }
  };

  return (
    <ul className="w-[1224px] mx-auto flex items-center my-[24px] justify-between leading-[30.05px] text-[24px] bg-white">
      <li onClick={handleClickFilter}>
        <button className="py-[5px] mr-[40px] font-bold hover:text-black relative after:contents-[''] after:absolute after:top-[100%] mt-[6px]  after:left-0 after:h-[2px] after:w-full after:block after:bg-black hover:after:w-full">
          최신순
        </button>
        <button className="py-[5px] font-bold text-gray3 hover:text-black relative after:contents-[''] after:absolute after:top-[100%] mt-[6px] after:left-0 after:h-[2px] after:w-0 after:block after:bg-black hover:after:w-full">
          Keep it 많은 순
        </button>
      </li>
      <li className="py- font-[500]">
        <button>모집중인 글만 보기</button>
      </li>
    </ul>
  );
}

export default RecruitFilterBar;
