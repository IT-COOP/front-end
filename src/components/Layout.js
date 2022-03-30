import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

function Layout() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
