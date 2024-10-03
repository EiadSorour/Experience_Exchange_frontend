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

let localStream;
let device;
let producerTransport;
let receiverTransport;
let audioProducer;
let videoProducer;
let remoteStreams = {};
let waitingUsers = {};
let inRoomUsers={};

function RoomPage(){

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    const user = jwtDecode(token);
    const {currentRoomID} = useParams();
    const socket = io(process.env.REACT_APP_GATEWAY_SOCKET_URL + "/rooms" , 
        {
            extraHeaders: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const localVideoRef = React.useRef(null);
    const [videoIconParams, setVideoIconParams] = React.useState({
        color: "red",
        class: "fa-solid fa-video-slash fa-2xl"
    });
    const [audioIconParams, setAudioIconParams] = React.useState({
        color: "red",
        class: "fa-solid fa-microphone-slash fa-2xl"
    });
    const [roomTopic, setRoomTopic] = React.useState("");
    const [creatorUsername, setCreatorUsername] = React.useState("");
    const [dummy, reRender] = React.useState(0);

    React.useEffect(()=>{

        const begin = async ()=>{

            socket.emit("getRoomData" , {roomID: currentRoomID});

            localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localStream.getAudioTracks()[0].enabled = false;
            localStream.getVideoTracks()[0].enabled = false;
            reRender((prev) => prev + 1);

            socket.emit("createProducerTransport", {
                roomID: currentRoomID,
                username: user.username,
            });
            
            socket.emit("createConsumerTransport", {
                roomID: currentRoomID,
                username: user.username,
            });
        }
        begin();

    }, [])

    React.useEffect(()=>{

        if(localVideoRef.current){
            localVideoRef.current.srcObject = localStream;
        }

        Object.keys(remoteStreams).forEach((key)=>{
            if(key !== creatorUsername){
                const remoteVideo = document.getElementById(`remote-${key}`);
                remoteVideo.srcObject = remoteStreams[key];
            }else if(document.getElementById(`remote-${creatorUsername}`)){
                const remoteVideo = document.getElementById(`remote-${creatorUsername}`);
                remoteVideo.srcObject = remoteStreams[creatorUsername];
            }
        })

    }, [dummy, localVideoRef.current]);

    socket.on("gotRoomData", (body)=>{
        const {topic, creatorUsername, roomMembers} = body;
        inRoomUsers = {...roomMembers};
        setRoomTopic(topic);
        setCreatorUsername(creatorUsername);
    });

    socket.on("producerTransportCreated", async (data)=>{

        device = new mediasoupClient.Device();
        try {
            await device.load({ routerRtpCapabilities: data.rtpCapabilities });
        } catch (error) {
            console.error("Error loading device:", error);
            return;
        }
        
        producerTransport = device.createSendTransport(data);

        producerTransport.on('connect', ({ dtlsParameters }, callback) => {
            socket.emit('connectProducerTransport', { dtlsParameters , roomID: data.roomID, username: user.username} );
            callback();
        });

        producerTransport.on("produce", (parameters , callback)=>{
            socket.emit('produce', {roomID: data.roomID, username: user.username, kind: parameters.kind, rtpParameters: parameters.rtpParameters });
            callback({id: producerTransport.id});
        });

        // Create video producer
        const videoTrack = localStream.getVideoTracks()[0];
        videoProducer = await producerTransport.produce({ track: videoTrack });

        // Create audio producer
        const audioTrack = localStream.getAudioTracks()[0];
        audioProducer = await producerTransport.produce({ track: audioTrack });

    })

    socket.on("receiverTransportCreated", async (data)=>{

        if(!device.loaded){
            await device.load({ routerRtpCapabilities: data.rtpCapabilities });
            receiverTransport = device.createRecvTransport(data);
        }else{
            receiverTransport = device.createRecvTransport(data);
        }
        
        receiverTransport.on("connect", ({ dtlsParameters }, callback) => {
            socket.emit('connectConsumerTransport', { dtlsParameters , roomID: data.roomID, username: user.username} );
            callback();
        });
        
        socket.emit("newUserJoined", {
            username: user.username,
            roomID: data.roomID,
            rtpCapabilities: device.rtpCapabilities,
        })
    })
    
    socket.on("newProducer", async (body)=>{

        const {username,producerID ,kind} = body;
        
        socket.emit("createConsumer", {
            roomID: currentRoomID,
            producerUsername: username,
            rtpCapabilities: device.rtpCapabilities,
            kind: kind,
            producerID: producerID,
            username: user.username
        })
    })

    socket.on("newConsumer", async (body)=>{

        const {consumerId,producerId,kind,rtpParameters,producerUsername, producerClientId} = body;

        const consumer = await receiverTransport.consume({
            id: consumerId,
            producerId: producerId,
            kind: kind,
            rtpParameters: rtpParameters,
        });

        if(!remoteStreams[`${producerUsername}`] || remoteStreams[`${producerUsername}`].getTracks().length == 2){
            remoteStreams[`${producerUsername}`] = new MediaStream();
            remoteStreams[`${producerUsername}`].addTrack(consumer.track);
            reRender((prev) => prev + 1);
        }else{
            remoteStreams[`${producerUsername}`].addTrack(consumer.track);
            reRender((prev) => prev + 1);
        }
    })

    socket.on("roomEnded", async ()=>{
        window.location.href = `/client/options`;
    })

    socket.on("producerDisconnected", (body)=>{
        const {producerUsername} = body;

        if(producerUsername === creatorUsername){
            document.getElementById(`remote-${producerUsername}`).style = "display: none";
        }

        delete remoteStreams[`${producerUsername}`];
        delete inRoomUsers[`${producerUsername}`];

        reRender((prev) => prev + 1);
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
    });

    socket.on("gotUsersWaiting", (body)=>{
        waitingUsers = {...body};
        reRender((prev) => prev + 1);
    })

    socket.on("mustWait", (body)=>{
        window.location.href = `/waiting/${currentRoomID}`;
    });

    function videoControl(event){
        event.preventDefault();
        if(videoProducer.paused){
            videoProducer.resume();
            setVideoIconParams({
                color: "#3776e1",
                class: "fa-solid fa-video fa-2xl"
            });
        }else{
            videoProducer.pause();
            setVideoIconParams({
                color: "red",
                class: "fa-solid fa-video-slash fa-2xl"
            });
        }
    }
    
    function audioControl(event){
        event.preventDefault();
        if(audioProducer.paused){
            audioProducer.resume();
            setAudioIconParams({
                color: "#3776e1",
                class: "fa-solid fa-microphone fa-2xl"
            });
        }else{
            audioProducer.pause();
            setAudioIconParams({
                color: "red",
                class: "fa-solid fa-microphone-slash fa-2xl"
            });
        }
    }

    function endRoom(event){
        socket.emit("endRoom", {roomID:currentRoomID});
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

        socket.emit("acceptUser" , {roomID:currentRoomID , acceptedUsername: username  , acceptedId: userId});
    }
    
    function rejectUser(args , event){
        event.preventDefault();
        
        const username = args[0];
        const userId = waitingUsers[`${username}`][`id`];

        socket.emit("rejectUser" , {roomID:currentRoomID , rejectedUsername: username  , rejectedId: userId});
    }



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
                    <div className="text-center" style={{width:"30%" , height:"100vh" , overflowY:"scroll"}}>
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
                            <h1 className="pt-2"><span className="text-info">Topic:</span> {roomTopic}</h1>
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
                            <button onClick={videoControl} className="btn btn-dark"><i id="videoIcon" style={{color: videoIconParams.color}} className={videoIconParams.class}></i></button>
                            <button onClick={audioControl} className="btn btn-dark"><i id="audioIcon" style={{color: audioIconParams.color}} className={audioIconParams.class}></i></button>
                            {/* <button onClick={test} className="btn btn-dark">test</button> */}
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
                    <div className="text-center" style={{width:"30%" , height:"100vh" , overflowY:"scroll"}}>
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
                            <div className="d-flex flex-column flex-wrap justify-content-center">
                                {remoteStreams[`${creatorUsername}`] ? 
                                    <div className="m-3">
                                        <h5 className="text-secondary">{creatorUsername}</h5>
                                        <video id={`remote-${creatorUsername}`} style={{width:"400px" , height:"220px"}} autoPlay></video>
                                    </div>
                                : <></>}
                                <div id="videos" className="d-flex flex-wrap justify-content-center">
                                    <div className="m-1">
                                        <h5 className="text-secondary">{user.username}</h5>
                                        <video ref={localVideoRef} id="localVideo" style={{width:"50px" , height:"50px"}} autoPlay></video>
                                    </div>
                                    {Object.keys(remoteStreams).map((key)=>{
                                        if(key !== creatorUsername){
                                            return (
                                                <div className="m-1">
                                                    <h5 className="text-secondary">{key}</h5>
                                                    <video id={`remote-${key}`} style={{width:"50px" , height:"50px"}} autoPlay></video>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-flex text-center" style={{height:"10vh"}}>
                            <button onClick={videoControl} className="btn btn-dark"><i id="videoIcon" style={{color: videoIconParams.color}} className={videoIconParams.class}></i></button>
                            <button onClick={audioControl} className="btn btn-dark"><i id="audioIcon" style={{color: audioIconParams.color}} className={audioIconParams.class}></i></button>
                            {/* <button onClick={test} className="btn btn-dark">test</button> */}
                            <button onClick={leaveRoom} className="btn btn-danger m-3 ms-auto">Leave Room</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomPage;