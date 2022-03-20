import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Recruit from "./routes/recruit/Recuit";
import Header from "./components/header/Header";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <main className="max-w-[1224px] mx-[auto]">
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recruit" element={<Recruit />} />
      </Routes>
    </main>
  </BrowserRouter>,
  document.getElementById("root"),
);
