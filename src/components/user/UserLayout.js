import React from "react";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <section className="w-full min-h-screen bg-white3">
      <div className="w-[1224px] mx-auto">
        <Outlet />
      </div>
    </section>
  );
}

export default UserLayout;
