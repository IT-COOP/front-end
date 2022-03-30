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
import Recruit from "./routes/Recruit/Recruit";

import User from "./routes/User";
import UserEdit from "./routes/User/edit";
import Auth from "./components/login/Auth";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Recruit />} />
          <Route path="recruit/write" element={<RecruitWrite />} />
          <Route path="recruit/:recruitId" element={<RecruitBoardDetail />} />
          <Route
            path="user/:id"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="user/:id/edit"
            element={
              <PrivateRoute>
                <UserEdit />
              </PrivateRoute>
            }
          />
          <Route path="app" element={<App />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
