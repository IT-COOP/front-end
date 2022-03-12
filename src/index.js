import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "./App";
import Recuit from './routes/Recuit/Recuit';

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/recruit' element={<Recuit/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
