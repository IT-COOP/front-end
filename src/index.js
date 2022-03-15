import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import LoginButtons from "./routes/Login/LoginButtons";
import { store } from './state/configureStore';

import Test from "./routes/Login/Test";
import Join from "./routes/Login/Join"

import "./index.css";

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<LoginButtons />}>
          <Route path="test" element={<Test />} />
        </Route>
        <Route path='/test' element={<Join/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root"),
);
