import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";

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
        <div>
            <div className="d-inline-flex align-items-center p-2">
                <h1>Welcome, <span className="text-decoration-underline fw-bold me-3">{user.username}</span></h1>
                <a onClick={handleOnLogout} role="button" className="link-danger link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Logout</a>
            </div>

            <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
            
                <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
                    <input style={{minWidth: "120px"}} type="text" class="form-control" placeholder="Search by topic"/>
                    <button class="btn btn-primary ms-2">Search</button>
                    <button class="btn btn-secondary ms-2">Reset</button>
                </div>
                
                <div style={{overflowY:"scroll", height:"450px"}}>
                    <table class="table table-responsive table-borderless align-middle caption-top">
                        <caption>Available rooms</caption>
                        <tbody>
                            <tr>
                                <td scope="row"><span className="fw-bold text-danger">Room Topic :</span> this is topic</td>
                                <td rowSpan={3}><button className="btn btn-success">Ask to join</button></td>
                            </tr>
                            <tr>
                                <td scope="row"><span className="fw-bold text-danger">Creator:</span> eiad tarek</td>
                            </tr>
                            <tr>
                                <td scope="row"><span className="fw-bold text-danger">Creator profession:</span> ai engineer</td>
                            </tr>
                            <tr><td colSpan={2}><hr/></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <button className="btn btn-primary m-5 position-absolute bottom-0 end-0">Create Room</button>
        </div>
    )
}

export default ClientOptionsPage;