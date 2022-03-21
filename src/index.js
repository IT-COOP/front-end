import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/configureStore";
import RecruitBoardDetail from "./components/recruit/RecruitBoardDetail";
import RecruitWrite from "./components/recruit/RecruitWrite";
import Recruit from "./routes/Recruit/Recruit";
import Header from "./components/header/Header";
import User from "./routes/User";
import UserEdit from "./routes/User/edit";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <main className="max-w-[1224px] mx-[auto] pt-[100px]">
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/mypage" element={<User />} />
          <Route path="/mypage/edit" element={<UserEdit />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/recruit/write/:id" element={<RecruitWrite />} />
          <Route path="/recruit/:id" element={<RecruitBoardDetail />} />
        </Routes>
      </main>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
