import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Test() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState(
    searchParams.get("accessToken") ?? "",
  );

  console.log(accessToken);

  useEffect(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return <h1>accessToken: {accessToken}</h1>;
}

export default Test;
