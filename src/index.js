import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "./App";
import RecruitBoardDetail from "./components/recruit/RecruitBoardDetail";
import RecruitWrite from "./components/recruit/RecruitWrite";
import Recruit from "./routes/Recruit/Recruit";
import Header from "./components/header/Header";
import User from "./routes/User";
import UserEdit from "./routes/User/edit";
import Auth from "./components/login/Auth";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <main className="w-full">
        <Header />
        <Routes>
          <Route path="/app" element={<App />} />
          <Route path="/mypage" element={<User />} />
          <Route path="/mypage/edit" element={<UserEdit />} />
          <Route path="/" element={<Recruit />}></Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="/recruit/write" element={<RecruitWrite />} />
          <Route path="/recruit/:id" element={<RecruitBoardDetail />} />
        </Routes>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
