import React from "react";
import { useNavigate } from "react-router-dom";

const BoardEditAndDelete = ({ openBoardDeleteModal, recruitId }) => {
  const navigate = useNavigate();
  return (
    <>
      <li className="flex flex-row-reverse gap-[14px]">
        <button
          className="block text-[14px]  leading-[20px] text-gray4 text-center hover:font-bold"
          onClick={openBoardDeleteModal}
        >
          삭제하기
        </button>
        <button
          className="block text-[14px]  leading-[20px] text-gray4 text-center hover:font-bold"
          onClick={() => navigate(`/recruit/edit/${recruitId}`)}
        >
          수정하기
        </button>
      </li>
    </>
  );
};

export default BoardEditAndDelete;
