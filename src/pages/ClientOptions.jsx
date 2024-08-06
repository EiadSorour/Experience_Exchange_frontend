import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

function ClientOptionsPage(){
    
    const cookies = new Cookies();
    const navigate = useNavigate();
    const token = cookies.get("access_token");
    const user = jwtDecode(token);

    async function handleOnLogout(event){
        event.preventDefault();
        cookies.remove("access_token", {path:"/"});
        try{
            await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
            navigate("/login");
        }catch(error){
            alert(error.message);
        }
    }

    return (
        <div className="text-center d-grid gap-2 col-3 mx-auto position-absolute top-50 start-50 translate-middle">
            <h1>Welcome, <span className="text-decoration-underline fw-bold ">{user.username}</span></h1>
            <a onClick={handleOnLogout} role="button" className="link-danger link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Logout</a>
        </div>
    )
}

export default ClientOptionsPage;