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
    const socket = io(process.env.REACT_APP_GATEWAY_SOCKET_URL + "/rooms" , 
        {
            extraHeaders: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const [availableRooms , setAvailableRooms] = React.useState();
    const [creatingRoom , setCreatingRoom] = React.useState(false);
    const [createTopic, setCreateTopic] = React.useState("");
    const [searchTopic, setSearchTopic] = React.useState("");

    React.useEffect(()=>{
        socket.emit("getAllRooms");
    }, []);

    socket.on("ReceivedRooms" , (rooms)=>{
        setAvailableRooms(rooms);
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

    function onSearchTopicChange(event){
        const topic = event.target.value;
        setSearchTopic(topic);
    }

    function onSearch(event){
        event.preventDefault();
        socket.emit("getTopic" , searchTopic);
    }
    
    function onOpenCreateWindow(event){
        event.preventDefault();
        setSearchTopic("");
        setCreatingRoom(true);
    }

    function onCreateTopicChange(event){
        const topic = event.target.value;
        setCreateTopic(topic);
    }

    function onReset(){
        window.location.reload();
    }

    function onBack(event){
        socket.emit("getAllRooms");
        event.preventDefault();
        setCreateTopic("");
        setCreatingRoom(false);
    }

    if(availableRooms && !creatingRoom){
        return (
            <div>
                <div className="d-inline-flex align-items-center p-2">
                    <h1>Welcome, <span className="text-decoration-underline fw-bold me-3">{user.username}</span></h1>
                    <a onClick={onLogout} role="button" className="link-danger link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Logout</a>
                </div>

                <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
                
                    <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
                        <input onChange={onSearchTopicChange} style={{minWidth: "120px"}} type="text" class="form-control" placeholder="Search by topic"/>
                        <button onClick={onSearch} class="btn btn-primary ms-2">Search</button>
                        <button onClick={onReset} class="btn btn-secondary ms-2">Reset</button>
                    </div>
                    
                    <div style={{overflowY:"scroll", height:"450px"}}>
                        <table class="table table-responsive table-borderless align-middle caption-top">
                            <caption>Available rooms</caption>
                            {availableRooms.map((room)=>{
                                return (
                                    <tbody>
                                        <tr>
                                            <td scope="row" className="text-capitalize"><span className="fw-bold text-danger">Room Topic:</span> {room.topic}</td>
                                            <td rowSpan={3}><button className="btn btn-success">Ask to join</button></td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-capitalize"><span className="fw-bold text-danger">Creator:</span> {room.creatorUsername}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-capitalize"><span className="fw-bold text-danger">Creator profession:</span> {room.creatorProf}</td>
                                        </tr>
                                        <tr><td colSpan={2}><hr/></td></tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>

                <button onClick={onOpenCreateWindow} className="btn btn-primary m-5 position-absolute bottom-0 end-0">Create Room</button>
            </div>
        )
    }else if(creatingRoom){
        return (
            <div>
                <div className="d-inline-flex align-items-center p-2">
                    <h1>Welcome, <span className="text-decoration-underline fw-bold me-3">{user.username}</span></h1>
                    <a onClick={onLogout} role="button" className="link-danger link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Logout</a>
                </div>

                <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
                    <div class="container">
                        <div className="row justify-content-center">
                            <input onChange={onCreateTopicChange} style={{minWidth: "120px", maxWidth: "500px"}} type="text" class="form-control" placeholder="Room Topic"/>
                        </div>
                        <div className="row justify-content-center">
                            <button style={{minWidth: "100px"}} class="btn btn-success m-3 col-1">Create</button>
                        </div>
                    </div>
                </div>

                <button onClick={onBack} className="btn btn-primary m-4 position-absolute bottom-0 start-0">Back</button>
            </div>
        )
    }else{
        return <h1>Loading...</h1>
    }
}

export default ClientOptionsPage;