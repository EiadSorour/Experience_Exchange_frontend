import React from "react";
import RegisterPage from "./pages/Register";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import LoginPage from "./pages/Login";
import AdminOptionsPage from "./pages/AdminOptions";
import PrivateAdminRoutes from "./utils/PrivateAdminRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import ClientOptionsPage from "./pages/ClientOptions";
import UsersPage from "./pages/Users";
import RoomsHistoryPage from "./pages/RoomsHistory";
import RoomPage from "./pages/Rooms";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RegisterPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        
        <Route element={<PrivateRoutes/>}>
          <Route path="/client/options" element={<ClientOptionsPage />}/>
          <Route path="/room" element={<RoomPage />}/>
        </Route>

        <Route element={<PrivateAdminRoutes/>}>
          <Route path="/admin/options" element={<AdminOptionsPage />}/>
          <Route path="/users" element={<UsersPage />}/>
          <Route path="/rooms/history" element={<RoomsHistoryPage />}/>
        </Route>

        <Route path="*" element={<h1>Not found</h1>}/>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
