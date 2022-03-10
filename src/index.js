import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import LoginButtons from "./routes/Login/LoginButtons";
import LoginIndicator from "./routes/Login/LoginIndicator";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<LoginButtons />}>
        <Route path=":platform" element={<LoginIndicator />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
