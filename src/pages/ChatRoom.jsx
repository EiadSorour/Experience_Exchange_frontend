import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import * as mediasoupClient from "mediasoup-client";
import {
    types,
    version,
    Device,
    detectDevice,
    parseScalabilityMode,
    debug
} from "mediasoup-client";

let waitingUsers = {};
let inRoomUsers={};

function Message({message , username}){
    if(username){
        return (
            <div className="p-2 align-self-start" style={{maxWidth: "250px"}}>
                <div className="text-bold text-warning">{username}</div>
                <div className="d-flex flex-column align-items-start rounded p-1 bg-secondary" style={{ height:"auto" ,width:"auto", textAlign:"start" , wordBreak: "break-word"}}>
                    <div className="mx-2">{message}</div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="p-2 align-self-end" style={{maxWidth: "250px"}}>
                <div className="d-flex flex-column align-items-start rounded p-1 bg-success" style={{height:"auto" ,width:"auto", textAlign:"start" , wordBreak: "break-word"}}>
                    <div className="mx-2">{message}</div>
                </div>
            </div>
        )
    }
}

function ChatRoom(){

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    const user = jwtDecode(token);
    const {currentRoomID} = useParams();
    const roomType = "Chat";
    const socket = io(process.env.REACT_APP_GATEWAY_SOCKET_URL + "/rooms" , 
        {
            extraHeaders: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const [roomTopic, setRoomTopic] = React.useState("");
    const [creatorUsername, setCreatorUsername] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [messagesElements ,setMessagesElements] = React.useState([]);
    const [dummy, reRender] = React.useState(0);

    React.useEffect(()=>{

        const begin = async ()=>{
            socket.emit("getRoomData" , {roomID: currentRoomID, username: user.username});
        }
        begin();

    }, [])

    React.useEffect(() => {
        
        const handleTabClose = (event) => {
            socket.emit("leavingChat" , {username: user.username , roomID: currentRoomID});
        };

        window.addEventListener('beforeunload', handleTabClose);

    }, [socket]);

    socket.on("userLeftChat", (body)=>{
        const {username} = body;
        delete inRoomUsers[`${username}`];
        reRender((prev) => prev + 1);
    })

    socket.on("gotRoomData", (body)=>{
        const {topic, creatorUsername, roomMembers} = body;
        inRoomUsers = {...roomMembers};
        setRoomTopic(topic);
        setCreatorUsername(creatorUsername);
    });

    socket.on("roomEnded", async ()=>{
        window.location.href = `/client/options`;
    })

    socket.on("userKicked" , (body)=>{ 
        window.location.href = `/client/options`;
    });

    socket.on("getUsername", (body)=>{
        socket.emit("gotUsername", {username: user.username , roomID: currentRoomID});
    });

    socket.on("newMember", (body)=>{
        const {username, id} = body;

        inRoomUsers[`${username}`] = id;

        reRender((prev) => prev + 1);
    });

    socket.on("gotUsersWaiting", (body)=>{
        waitingUsers = {...body};
        reRender((prev) => prev + 1);
    })

    socket.on("mustWait", (body)=>{
        window.location.href = `/waiting/${currentRoomID}`;
    });

    function endRoom(event){
        socket.emit("endRoom", {roomID:currentRoomID, roomType: roomType});
    }

    function leaveRoom(event){
        window.location.href = `/client/options`;
    }

    function kickUser(args , event){
        event.preventDefault();
        const usernameToKick = args[0];
        socket.emit("kickClient" , { usernameToKick , roomID: currentRoomID , clientId: inRoomUsers[`${usernameToKick}`]});
    }

    function acceptUser(args , event){
        event.preventDefault();

        const username = args[0];
        const userId = waitingUsers[`${username}`][`id`];

        socket.emit("acceptUser" , {roomID:currentRoomID , roomType: roomType ,acceptedUsername: username  , acceptedId: userId});
    }
    
    function rejectUser(args , event){
        event.preventDefault();
        
        const username = args[0];
        const userId = waitingUsers[`${username}`][`id`];

        socket.emit("rejectUser" , {roomID:currentRoomID , rejectedUsername: username  , rejectedId: userId});
    }

    function sendMessage(event){
        event.preventDefault();
        if(message.trim().length > 0){
            setMessage("");
            socket.emit("sendMessage" , {roomID: currentRoomID, username: user.username , message: message});
        }
    }

    function onMessageChange(event){
        const message = event.target.value;
        setMessage(message);
    }

    socket.on("gotMessage" , (body)=>{
        const {username , message} = body;
        const key = messagesElements.length + 1;
        if(username !== user.username){
            setMessagesElements((prev)=>{
                return (
                    [...prev, <Message key={key} message={message} username={username}></Message>]
                )
            });
        }else{
            // this is your message
            setMessagesElements((prev)=>{
                return (
                    [...prev, <Message key={key} message={message}></Message>]
                )
            });
        }
    });




    async function test(){

        // console.log(remoteStreams);
        socket.emit("test", {
            roomID: currentRoomID,
            username: "qq"
        })
    }

    socket.on("test", (body)=>{
        console.log(body.room);
    })

    if(creatorUsername === user.username){
        return (
            <div>
                <div class="d-flex align-items-stretch" style={{minHeight: "100vh"}}>
                    <div className="text-center" style={{width:"30%" , height:"100vh" , overflowY:"scroll", scrollbarWidth: "thin"}}>
                        <h4 className="mt-4 text-info">Waiting</h4>
                        {Object.keys(waitingUsers).map((username)=>{
                            if(waitingUsers[`${username}`]['accepted'] == false){
                                return (
                                    <div className="d-flex justify-content-center align-items-baseline m-2">
                                        <h6>{username}</h6>
                                        <button onClick={ acceptUser.bind(this , [username]) } className="btn btn-sm ms-1 btn-dark"><i style={{color: "green"}} className="fa-solid fa-circle-check fa-lg"></i></button>
                                        <button onClick={ rejectUser.bind(this , [username]) }  className="btn btn-sm btn-dark"><i style={{color: "red"}} className="fa-solid fa-circle-xmark fa-lg"></i></button>
                                    </div>
                                )
                            }
                        })}
                        <hr className="m-1 mt-4"/>
                        <h4 className="mt-4 text-info">In Room</h4>
                        {Object.keys(inRoomUsers).map((username)=>{
                            if(username != user.username){
                                return(
                                    <div className="d-flex justify-content-center align-items-baseline m-3">
                                        <h6>{username}</h6>
                                        <button onClick={ kickUser.bind(this , [username]) } className="btn btn-danger ms-3">Kick</button>
                                    </div>
                                )
                            }
                        })}
                        
                    </div>
    
                    <div style={{width:"100%" , height:"100vh"}}>
                        
                        <div className="text-center" style={{height:"85vh"}}>
                            <h1 className="pt-2 mb-5"><span className="text-info">Topic:</span> {roomTopic}</h1>



                            <div className="d-flex text-start flex-column mx-4" style={{overflow: "auto" , height: "70vh", scrollbarWidth: "none"}}>
                                {messagesElements}
                            </div>



                        </div>
                        <hr/>
                        <div className="d-flex text-center" style={{height:"10vh"}}>
                            {/* <button onClick={test} className="btn btn-dark">test</button> */}
                            <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
                                <textarea onChange={onMessageChange} value={message} style={{minWidth: "120px", resize: "none", scrollbarWidth: "none"}} type="text" class="form-control" placeholder="message"/>
                                <button onClick={sendMessage} className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-paper-plane fa-xl"></i></button>
                            </div>
                            <button onClick={endRoom} className="btn btn-danger m-3 ms-auto">End Room</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <div class="d-flex align-items-stretch" style={{minHeight: "100vh"}}>
                    <div className="text-center" style={{width:"30%" , height:"100vh" , overflowY:"scroll", scrollbarWidth: "thin"}}>
                        <h4 className="mt-4 text-info">Waiting</h4>
                        {Object.keys(waitingUsers).map((username)=>{
                            if(waitingUsers[`${username}`]['accepted'] == false){
                                return (
                                    <div className="d-flex justify-content-center align-items-baseline m-2">
                                        <h6>{username}</h6>
                                    </div>
                                )
                            }
                        })} 
                        <hr className="m-1 mt-4"/>
                        <h4 className="mt-4 text-info">In Room</h4>
                        {Object.keys(inRoomUsers).map((username)=>{
                            if(username != user.username){
                                return(
                                    <div className="d-flex justify-content-center align-items-baseline m-3">
                                        <h6>{username}</h6>
                                    </div>
                                )
                            }
                        })}
                    </div>
    
                    <div style={{width:"100%" , height:"100vh"}}>
                        
                        <div className="text-center" style={{height:"85vh"}}>
                            <h1 className="pt-2"><span className="text-info">Topic:</span> {roomTopic}</h1>

                            <div className="d-flex text-start flex-column mx-4" style={{overflow: "auto" , height: "70vh", scrollbarWidth: "none"}}>
                                {messagesElements}
                            </div>
                            
                        </div>
                        <hr/>
                        <div className="d-flex text-center" style={{height:"10vh"}}>
                            {/* <button onClick={test} className="btn btn-dark">test</button> */}
                            <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
                                <textarea onChange={onMessageChange} value={message} style={{minWidth: "120px" , resize: "none", scrollbarWidth: "none"}} type="text" class="form-control" placeholder="message"/>
                                <button onClick={sendMessage} className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-paper-plane fa-xl"></i></button>
                            </div>
                            <button onClick={leaveRoom} className="btn btn-danger m-3 ms-auto">Leave Room</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom;