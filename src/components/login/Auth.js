import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import useUserCheckQuery from "../../hooks/useUserCheckQuery";

function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  useEffect(() => {
    searchParams.get("accessToken");
    setToken(searchParams.get("accessToken"));
    console.log(token);
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default Auth;
