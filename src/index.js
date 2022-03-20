import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Recuit from "./routes/Recuit/Recuit";

import "./index.css";
import MyPage from "./routes/MyPage";

ReactDOM.render(
  <BrowserRouter>
    <main className="max-w-[1224px] mx-[auto]">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recruit" element={<Recuit />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </main>
  </BrowserRouter>,
  document.getElementById("root"),
);
