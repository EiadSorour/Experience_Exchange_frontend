import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";

var peerConnections = {};
var localStream;
var remoteStreams = {};
var candidatesBuffer = {};
var currenRoomUsername = "";

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
    const peerConfig = {
        iceServers:[
            {
                urls:[
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302'
                ]
            }
        ]
    }

    const localVideoRef = React.useRef(null);

    const [availableRooms , setAvailableRooms] = React.useState();
    const [creatingRoom , setCreatingRoom] = React.useState(false);
    const [inRoom , setInRoom] = React.useState(false);
    const [createTopic, setCreateTopic] = React.useState("");
    const [searchTopic, setSearchTopic] = React.useState("");
    const [dummy, reRender] = React.useState(0);

    React.useEffect(()=>{
        socket.emit("getAllRooms");
    }, []);
    
    React.useEffect(()=>{

        if(localVideoRef.current){
            localVideoRef.current.srcObject = localStream;
        }

        Object.keys(remoteStreams).forEach((key)=>{
            const remoteVideo = document.getElementById(`remote-${key}`);
            remoteVideo.srcObject = remoteStreams[key];
        })

    }, [dummy, localVideoRef.current]);

    socket.on("ReceivedRooms" , (rooms)=>{
        setAvailableRooms(rooms);
    });



    socket.on("newUserJoin" , async (body)=>{
        const {clientUsername, userSocket} = body;

        peerConnections[clientUsername] = new RTCPeerConnection(peerConfig);
        
        localStream.getTracks().forEach(track => {
            peerConnections[clientUsername].addTrack(track,localStream);
        });

        remoteStreams[clientUsername] = new MediaStream();

        peerConnections[clientUsername].ontrack = (event)=>{
            event.streams[0].getTracks().forEach(track=>{
                peerConnections[clientUsername].addTrack(track,remoteStreams[clientUsername]);
                remoteStreams[clientUsername].addTrack(track);
            })
        };

        peerConnections[clientUsername].onicecandidate = (event)=>{
            const iceCandidate = event.candidate;
            if(iceCandidate){
                socket.emit("sendCandidateToServer",{
                    candidate: iceCandidate,
                    isOffer: true,
                    toSocket: userSocket,
                    fromUser: user.username
                });
            }
        };

        const offer = await peerConnections[clientUsername].createOffer();
        peerConnections[clientUsername].setLocalDescription(offer);

        socket.emit("joinAccepted" , {
            offer: offer,
            toSocket: userSocket,
            clientUsername: user.username
        });

    });

    socket.on("getAnswer" , async (body)=>{
        const {offer,fromSocket,fromClientUsername} = body;

        peerConnections[fromClientUsername] = new RTCPeerConnection(peerConfig);

        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            // audio: true
        });

        localStream.getTracks().forEach(track => {
            peerConnections[fromClientUsername].addTrack(track,localStream);
        });

        remoteStreams[fromClientUsername] = new MediaStream();

        peerConnections[fromClientUsername].ontrack = (event)=>{
            event.streams[0].getTracks().forEach(track=>{
                peerConnections[fromClientUsername].addTrack(track,remoteStreams[fromClientUsername]);
                remoteStreams[fromClientUsername].addTrack(track);
            })
        };

        peerConnections[fromClientUsername].onicecandidate = (event)=>{
            const iceCandidate = event.candidate;
            if(iceCandidate){
                socket.emit("sendCandidateToServer",{
                    candidate: iceCandidate,
                    isOffer: false,
                    toSocket: fromSocket,
                    fromUser: user.username
                });
            }
        };

        peerConnections[fromClientUsername].setRemoteDescription(offer);

        candidatesBuffer[fromClientUsername].forEach((candidate)=>{
            peerConnections[fromClientUsername].addIceCandidate(candidate);
        });

        reRender((prev) => prev + 1);

        const answer = await peerConnections[fromClientUsername].createAnswer({});
        peerConnections[fromClientUsername].setLocalDescription(answer);
        
        socket.emit("sendAnswer", {
            answer: answer,
            toSocket: fromSocket,
            creatorUsername: currenRoomUsername,
            clientUsername: user.username
        });
    });

    socket.on("answerRecieved" , (body)=>{
        const {answer,clientUsername} = body;
        peerConnections[clientUsername].setRemoteDescription(answer);

        reRender((prev) => prev + 1);
    });

    socket.on("offerIceRecieved" , (body)=>{
        const {candidate ,fromUser} = body;

        if (!candidatesBuffer[fromUser]) {
            candidatesBuffer[fromUser] = [];
        }
        candidatesBuffer[fromUser].push(candidate);

        // peerConnections[fromUser].addIceCandidate(candidate);
    });

    socket.on("answerIceRecieved" , (body)=>{
        const {candidate ,fromUser} = body;
        
        peerConnections[fromUser].addIceCandidate(candidate);
    });

    

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



    async function onCreateRoom(event){
        event.preventDefault();

        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            // audio: true
        });

        socket.emit("roomCreated", {
            topic: createTopic,
            creatorUsername: user.username,
            creatorProf: user.profession,
        });

        setInRoom(true);
        setCreatingRoom(false);
    }

    async function joinRoom(args , event){
        event.preventDefault();
        const room = args[0];

        currenRoomUsername = room.creatorUsername;
        setCreateTopic(room.topic);

        socket.emit("askToJoin", {
            creatorUsername: room.creatorUsername,
            clientUsername: user.username
        });

        setInRoom(true);
        setCreatingRoom(false);
    }



    function onReset(){
        window.location.reload();
    }

    function onBack(event){
        socket.emit("getAllRooms");
        event.preventDefault();
        setCreateTopic("");
        setInRoom(false);
        setCreatingRoom(false);
    }

    if(availableRooms && !creatingRoom && !inRoom){
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
                                            <td onClick={joinRoom.bind(this , [room])} rowSpan={3}><button className="btn btn-success">Ask to join</button></td>
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
                            <button onClick={onCreateRoom} style={{minWidth: "100px"}} class="btn btn-success m-3 col-1">Create</button>
                        </div>
                    </div>
                </div>

                <button onClick={onBack} className="btn btn-primary m-4 position-absolute bottom-0 start-0">Back</button>
            </div>
        )
    }else if(inRoom){
        return (
            <div>
                <div class="d-flex align-items-stretch" style={{minHeight: "100vh"}}>
                    <div className="text-center" style={{width:"30%" , height:"100vh" , overflowY:"scroll"}}>
                        <h4 className="mt-4 text-info">Waiting</h4>
                        {/* <div className="d-flex justify-content-center align-items-baseline m-2">
                            <h6>eiad sorour</h6>
                            <button className="btn btn-sm ms-1 btn-dark"><i style={{color: "green"}} className="fa-solid fa-circle-check fa-lg"></i></button>
                            <button className="btn btn-sm btn-dark"><i style={{color: "red"}} className="fa-solid fa-circle-xmark fa-lg"></i></button>
                        </div> */}
                        <hr className="m-1 mt-4"/>
                        <h4 className="mt-4 text-info">In Room</h4>
                        {/* <div className="d-flex justify-content-center align-items-baseline m-3">
                            <h6>user33</h6>
                            <button className="btn btn-danger ms-3">Kick</button>
                        </div> */}
                    </div>

                    <div style={{width:"100%" , height:"100vh"}}>
                        
                        <div className="text-center" style={{height:"85vh"}}>
                            <h1 className="pt-2"><span className="text-info">Topic:</span> {createTopic}</h1>
                            <div className="d-flex flex-column flex-wrap justify-content-center">
                                <div className="m-3">
                                    <h5 className="text-secondary">{user.username}</h5>
                                    <video ref={localVideoRef} id="localVideo" style={{width:"400px" , height:"220px"}} autoPlay></video>
                                </div>
                                <div id="videos" className="d-flex flex-wrap justify-content-center">
                                    {Object.keys(remoteStreams).map((key)=>{
                                        return (
                                            <div className="m-1">
                                                <h5 className="text-secondary">{key}</h5>
                                                <video id={`remote-${key}`} style={{width:"50px" , height:"50px"}} autoPlay></video>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-flex text-center" style={{height:"10vh"}}>
                            <button className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-video fa-2xl"></i></button>
                            <button className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-microphone fa-2xl"></i></button>
                            <button onClick={onBack} className="btn btn-danger m-3 ms-auto">End Room</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }else{
        return <h1>Loading...</h1>
    }
}

export default ClientOptionsPage;