import React from "react";
import RegisterPage from "./pages/Register";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import LoginPage from "./pages/Login";
import AdminOptionsPage from "./pages/AdminOptions";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RegisterPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/admin/options" element={<AdminOptionsPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
