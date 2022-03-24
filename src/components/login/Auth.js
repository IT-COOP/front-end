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

  console.log(data);

  useEffect(() => {
    if (data) {
      if (!data.isProfileSet) {
        navigate("/", { replace: true, state: !data.isProfileSet });
      } else {
        localStorage.setItem("coopToken", data.data.accessToken);
        setCookie("coopCookie", data.data.refreshToken);
        navigate("/", { replace: true });
      }
    }
  }, [isSuccess, navigate, data]);

  error && navigate("/");

  return <></>;
}

export default Auth;
