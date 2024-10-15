import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useSocket } from "../utils/SocketContex";

function WaitingPage(){

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    const user = jwtDecode(token);
    const {currentRoomID} = useParams();
    const socket = useSocket();

    React.useEffect(()=>{
        socket.emit("userWaiting" , {roomID:currentRoomID, username: user.username});
    }, []);

    socket.on("accepted" , (body)=>{
        window.location.href = `/room/${body.roomType}/${currentRoomID}`;
    })

    socket.on("rejected" , (body)=>{
        window.location.href = `/client/options`;
    })

    async function onLogout(event){
        event.preventDefault();
        cookies.remove("access_token", {path:"/"});
        try{
            await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
            navigate("/login");
        }catch(error){
            alert(error.message);
        }
    }

    function onCancel(event){
        socket.emit("cancelWaiting" , {roomID: currentRoomID , username: user.username});
        window.location.href = "/client/options";
    }

    return (
        <div>
            <div className="d-inline-flex align-items-center p-2">
                <h1>Welcome, <span className="text-decoration-underline fw-bold me-3">{user.username}</span></h1>
                <a onClick={onLogout} role="button" className="link-danger link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Logout</a>
            </div>

            <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
                <div class="container">
                    <div className="row justify-content-center">
                        <h1 className="text-secondary ">Waiting for creator acceptance</h1>
                    </div>
                    <div className="row justify-content-center">
                        <button onClick={onCancel} style={{minWidth: "100px"}} class="btn btn-danger m-3 col-1">Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WaitingPage;