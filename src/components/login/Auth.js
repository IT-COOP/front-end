import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import SignUp from "./SignUp";
import useUserCheckQuery from "../../hooks/useUserCheckQuery";
import { setCookie } from "../../utils/cookie";
function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const token = searchParams.get("accessToken");

  const { data, isSuccess } = useUserCheckQuery(token);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setSearchParams("");
  // }, [searchParams, setSearchParams]);

  useEffect(() => {
    console.log(data);
    // if (data?.data) {
    //   if (data.data.userInfo) {
    //     localStorage.setItem("coopToken", data.data.accessToken);
    //     setCookie("coopCookie", data.data.refreshToken);
    //     navigate("/", { replace: true });
    //   } else {
    //     setIsSignUpModal(true);
    //   }
    // }
  }, [isSuccess, navigate, data]);
  return <>{isSignUpModal && <SignUp />}</>;
}

export default Auth;
