import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import GoogleLogin from "react-google-login";

const GITHUB_URL = process.env.REACT_APP_AUTH_GITHUB_URL;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginButtons() {
  const navigate = useNavigate();
  const curriedAssignHandler = url => () => window.location.assign(url);
  console.log(GOOGLE_CLIENT_ID);
  return (
    <>
      <button onClick={curriedAssignHandler(GITHUB_URL)}>GITHUB</button>
      {/**
       * TODO
       * - detect What kind of device user uses.
       * - If it is PC - use popup otherwise use redirect
       */}
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        uxMode="redirect"
        responseType="code"
        render={renderProps => (
          <button onClick={renderProps.onClick}>GOOGLE</button>
        )}
        onSuccess={({ code }) => {
          navigate(`/auth/google?code=${code}`);
        }}
        onFailure={console.error}
      />
      <Outlet />
    </>
  );
}

export default LoginButtons;
