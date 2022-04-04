import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "./App";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RecruitBoardDetail from "./components/recruit/RecruitBoardDetail";

import RecruitWrite from "./components/recruit/RecruitWrite";
import RecruitEdit from "./components/recruit/RecruitEdit";
import Recruit from "./routes/Recruit";

import User from "./routes/User";
import UserEdit from "./routes/User/edit";
import Auth from "./components/login/Auth";
import ChatRoom from "./routes/User/ChatRoom";
import Apply from "./routes/Apply";
import LandingPage from "./routes/Lading";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="recruit">
            <Route index element={<Recruit />} />
            <Route path="write" element={<RecruitWrite />} />
            <Route path="edit/:recruitId" element={<RecruitEdit />} />
            <Route path=":recruitId" element={<RecruitBoardDetail />} />
          </Route>
          <Route path="user">
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
            <Route
              path=":id/edit"
              element={
                <PrivateRoute>
                  <UserEdit />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/apply/:recruitId" element={<Apply />} />
          <Route path="/app" element={<App />} />
          <Route path="/chat/:roomNumber" element={<ChatRoom />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
