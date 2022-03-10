import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const availablePlatformList = ["github", "google", "kakao"];

function LoginIndicator() {
  const { platform } = useParams();
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get("code");

  if (
    platform === undefined ||
    !availablePlatformList.every(platform => platform)
  ) {
    throw new Error(`Unknown platform: ${platform}`);
  }

  if (!authorizationCode) {
    throw new Error(`There is no authorization code: ${authorizationCode}`);
  }

  return (
    <>
      <h1>
        {platform} Authorization code: {authorizationCode}
      </h1>
      <Link to="/auth">BACK</Link>
    </>
  );
}

export default LoginIndicator;
