import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import SignUp from "./SignUp";
import useUserCheckQuery from "../../hooks/useUserCheckQuery";
import { setCookie } from "../../utils/cookie";
function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token] = useState(searchParams.get("accessToken"));
  const navigate = useNavigate();

  localStorage.setItem("coopToken", token);

  useEffect(() => {
    setSearchParams("");
  }, [searchParams, setSearchParams]);

  const { data, error, isSuccess } = useUserCheckQuery(token);

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);
      if (data.data.userInfo) {
        localStorage.setItem("coopToken", data.data.accessToken);
        setCookie("coopCookie", data.data.refreshToken);
        navigate("/", { replace: true });
      }
    }
  }, [isSuccess, navigate, data]);
  return (
    <>
      <SignUp />
    </>
  );
}

export default Auth;
