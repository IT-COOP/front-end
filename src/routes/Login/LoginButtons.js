import React from "react";
import { Outlet } from "react-router-dom";

const GITHUB_URL = process.env.REACT_APP_AUTH_GITHUB_URL;
const GOOGLE_URL = process.env.REACT_APP_AUTH_GOOGLE_URL;
const KAKAO_URL = process.env.REACT_APP_AUTH_KAKAO_URL;

function LoginButtons() {
  const curriedAssignHandler = url => () => window.location.assign(url);

  return (
    <>
      <button className="mr-4" onClick={curriedAssignHandler(GITHUB_URL)}>
        GITHUB
      </button>
      <button className="mr-4" onClick={curriedAssignHandler(KAKAO_URL)}>
        KAKAO
      </button>
      <button className="mr-4" onClick={curriedAssignHandler(GOOGLE_URL)}>
        GOOGLE
      </button>
      <Outlet />
    </>
  );
}

export default LoginButtons;
