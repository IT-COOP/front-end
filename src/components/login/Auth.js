import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import SignUp from "./SignUp";
import useUserCheckMutation from "../../hooks/useUserCheckMutation";
import { setCookie } from "../../utils/cookie";

function Auth() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutateAsync } = useUserCheckMutation();
  const navigate = useNavigate();

  const temporaryToken = searchParams.get("accessToken");

  useEffect(() => {
    if (!temporaryToken) {
      return;
    }

    localStorage.setItem("coopToken", temporaryToken);

    async function userCheck() {
      try {
        const { data: userData } = await mutateAsync();

        const { accessToken, refreshToken, isProfileSet } = userData;

        localStorage.removeItem("coopToken");
        localStorage.setItem("coopToken", accessToken);

        if (typeof isProfileSet === "boolean" && !isProfileSet) {
          setIsSignUpModalOpen(true);
          return;
        }

        setCookie("coopCookie", refreshToken);
        setSearchParams("");
        navigate("/", { replace: true });
      } catch (error) {
        console.error(error);
        alert("알 수 없는 오류로 로그인에 실패하였습니다.");
        localStorage.removeItem("coopToken");
        navigate("/", { replace: true });
      }
    }

    userCheck();
  }, [temporaryToken, mutateAsync, navigate, setSearchParams]);

  return <>{isSignUpModalOpen && <SignUp />}</>;
}

export default Auth;
