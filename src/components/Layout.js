import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import usePageLocateScrollTop from "../hooks/usePageLocateScrollTop";
function Layout() {
  usePageLocateScrollTop();
  
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
