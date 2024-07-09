import React from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminOptionsPage(){
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    const user = jwtDecode(token);
    
    async function handleOnLogout(event){
        event.preventDefault();
        cookies.remove("access_token", {path:"/"});
        try{
            await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
            navigate("/login");
        }catch(error){
            console.log(error);
        }
    }

    async function handleUsersClick(event){
        event.preventDefault();
        navigate("/users");
    }

    return (
        <div class="text-center d-grid gap-2 col-3 mx-auto position-absolute top-50 start-50 translate-middle">
            <h3>Welcome, <span className="text-decoration-underline fw-bold ">{user.username}</span></h3>
            <button onClick={handleUsersClick} class="btn btn-primary" type="button">Users</button>
            <button class="btn btn-primary" type="button">Rooms Hirstory</button>
            <a onClick={handleOnLogout} role="button" className="link-danger link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Logout</a>
        </div>
    )
}

export default AdminOptionsPage;