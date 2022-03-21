import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import RecruitBoardDetail from "./components/recruit/RecruitBoardDetail";
import RecruitWrite from "./components/recruit/RecruitWrite";
import Recruit from "./routes/recruit/Recuit";
import Header from "./components/header/Header";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <main className="max-w-[1224px] mx-[auto] pt-[100px]">
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/recruit/write/:id" element={<RecruitWrite />} />
        <Route path="/recruit/:id" element={<RecruitBoardDetail />} />
      </Routes>
    </main>
  </BrowserRouter>,
  document.getElementById("root"),
);
