import React from "react";
import RegisterPage from "./pages/Register";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import LoginPage from "./pages/Login";
import AdminOptionsPage from "./pages/AdminOptions";
import PrivateAdminRoutes from "./utils/PrivateAdminRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import ClientOptionsPage from "./pages/ClientOptions";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RegisterPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        
        <Route element={<PrivateRoutes/>}>
          <Route path="/client/options" element={<ClientOptionsPage />}/>
        </Route>

        <Route element={<PrivateAdminRoutes/>}>
          <Route path="/admin/options" element={<AdminOptionsPage />}/>
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
