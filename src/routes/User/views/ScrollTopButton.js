import React from "react";

function ScrollTopButton() {
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleButtonClick}
      className="w-[50px] h-[50px] rounded-full fixed bottom-[150px] right-[242px] bg-gray1 border border-gray2 text-gray4 flex justify-center items-center uppercase"
    >
      TOP
    </button>
  );
}

export default ScrollTopButton;
