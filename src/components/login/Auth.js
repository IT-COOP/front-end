import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

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
    if (data) {
      if (data.data.data.userInfo) {
        localStorage.setItem("coopToken", data.data.data.accessToken);
        setCookie("coopCookie", data.data.data.refreshToken);
        navigate("/", { replace: true });
        window.location.replace("/");
      } else {
        navigate("/", { replace: true, state: true });
      }
    }
  }, [isSuccess, navigate, data]);

  error && navigate("/");

  return <></>;
}

export default Auth;
