import React from "react";
import RegisterPage from "./pages/Register";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import LoginPage from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
