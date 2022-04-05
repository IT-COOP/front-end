import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useDeleteRecruitBoardMutation from "../../../hooks/useDeleteRecruitBoardMutation";

const RecruitDeleteModal = ({ close, recruitId, boardDelete }) => {
  const navigate = useNavigate();
  const [isCompleteDelete, setIsCompleteDelete] = useState(false);
  const { mutateAsync: deleteRecruitBoard } = useDeleteRecruitBoardMutation();

  const handleDeleteType = async () => {
    if (boardDelete) {
      const { success } = await deleteRecruitBoard(recruitId);
      if (success) {
        setIsCompleteDelete(true);
        return;
      }
    }
  };
  return (
    <section className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <div className="w-[400px] h-[200px] bg-white flex flex-col items-center justify-center rounded-[16px]">
        {!isCompleteDelete ? (
          <div>
            <p className="mb-[30px] text-[18px] text-center">
              삭제하시겠습니까?
            </p>
            <div className="flex gap-[20px]">
              <button
                className="block text-[14px] w-[150px] rounded-[10px] bg-black leading-[40px] text-white text-center hover:font-bold"
                onClick={handleDeleteType}
              >
                삭제하기
              </button>
              <button
                className="block text-[14px] w-[150px] rounded-[10px] bg-black leading-[40px] text-white text-center hover:font-bold"
                onClick={close}
              >
                취소하기
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-[30px] text-[18px] text-center">삭제되었습니다.</p>
            <div className="flex gap-[20px]">
              <button
                className="block text-[14px] w-[150px] rounded-[10px] bg-black leading-[40px] text-white text-center hover:font-bold"
                onClick={() => navigate("/", { replace: true })}
              >
                메인화면으로
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecruitDeleteModal;
