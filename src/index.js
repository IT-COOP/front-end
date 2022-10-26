import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import Loading from "./components/Loading";

const Layout = lazy(() => import("./components/Layout"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const RecruitBoardDetail = lazy(() =>
  import("./components/recruit/RecruitBoardDetail"),
);

const RecruitWrite = lazy(() => import("./components/recruit/RecruitWrite"));
const RecruitEdit = lazy(() => import("./components/recruit/RecruitEdit"));
const Recruit = lazy(() => import("./routes/Recruit"));

const User = lazy(() => import("./routes/User"));
const UserEdit = lazy(() => import("./routes/User/edit"));
const Auth = lazy(() => import("./components/login/Auth"));
const ChatRoom = lazy(() => import("./routes/User/ChatRoom"));
const Apply = lazy(() => import("./routes/Apply"));
const LandingPage = lazy(() => import("./routes/Lading"));

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
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
            <Route path="/chat/:roomNumber" element={<ChatRoom />} />
          </Route>
        </Routes>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
