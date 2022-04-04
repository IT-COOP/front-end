import React from "react";

function EditUserPortfolioURL({ portfolioUrl, onPortfolioUrlChange }) {
  const handleInputChange = e => {
    onPortfolioUrlChange(e.target.value);
  };

  return (
    <div className="mb-[14px]">
      <h2 className="text-[17px] mb-[23px] font-medium">포트폴리오</h2>
      <input
        className="w-full h-[43px] pt-[10px] pb-[14px] pl-[6px] bg-white4 focus:outline-none text-[15px]"
        type="text"
        placeholder="URL"
        value={portfolioUrl}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default React.memo(EditUserPortfolioURL);
