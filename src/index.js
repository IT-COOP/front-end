import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Recuit from "./routes/Recuit/Recuit";

import "./index.css";
import User from "./routes/User";
import UserEdit from "./routes/User/edit";

ReactDOM.render(
  <BrowserRouter>
    <main className="max-w-[1224px] mx-[auto]">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recruit" element={<Recuit />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/edit" element={<UserEdit />} />
      </Routes>
    </main>
  </BrowserRouter>,
  document.getElementById("root"),
);
