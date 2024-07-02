import React from "react";
import RegisterPage from "./pages/Register";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import LoginPage from "./pages/Login";
import AdminOptionsPage from "./pages/AdminOptions";

function App() {

  const FRONT_URL = process.env.REACT_APP_FRONT_URL;
  const BACK_URL = process.env.REACT_APP_BACK_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RegisterPage BACK_URL={BACK_URL} FRONT_URL={FRONT_URL} />}/>
        <Route path="/register" element={<RegisterPage BACK_URL={BACK_URL} FRONT_URL={FRONT_URL} />}/>
        <Route path="/login" element={<LoginPage BACK_URL={BACK_URL} FRONT_URL={FRONT_URL}/>}/>
        <Route path="/admin/options" element={<AdminOptionsPage BACK_URL={BACK_URL} FRONT_URL={FRONT_URL}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
