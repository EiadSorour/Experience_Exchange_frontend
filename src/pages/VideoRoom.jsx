import React from "react";
import * as mediasoupClient from "mediasoup-client";
import { useSocket } from "../utils/SocketContex";
import BasicRoomFunctionalities from "../utils/BasicRoomFunc";
import RoomSideBar from "../components/RoomSideBar";
import InRoomUsers from "../components/InRoomUsers";
import WaitingList from "../components/WaitingList";
import RoomMiddle from "../components/RoomMiddle";
import RoomMiddleDown from "../components/RoomMiddleDown";
import RoomMiddleTop from "../components/RoomMiddleTop";

let localStream;
let device;
let producerTransport;
let receiverTransport;
let audioProducer;
let videoProducer;
let remoteStreams = {};

function VideoRoom(){

    const roomType = "Video";
    const socket = useSocket();
    const {
        user,
        currentRoomID,
        waitingUsers,
        inRoomUsers,
        roomTopic,
        creatorUsername, 
        message,
        messagesElements,
        dummy,
        endRoom,
        leaveRoom,
        kickUser,
        acceptUser,
        rejectUser, 
        sendMessage,
        onMessageChange,
        deleteInRoomUser,
        refresh
    } = BasicRoomFunctionalities(socket , roomType);


    const localVideoRef = React.useRef(null);
    const [videoIconParams, setVideoIconParams] = React.useState({
        color: "red",
        class: "fa-solid fa-video-slash fa-2xl"
    });
    const [audioIconParams, setAudioIconParams] = React.useState({
        color: "red",
        class: "fa-solid fa-microphone-slash fa-2xl"
    });

    React.useEffect(()=>{
    
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
                refresh();
            }else{
                remoteStreams[`${producerUsername}`].addTrack(consumer.track);
                refresh();
            }
        })

        socket.on("producerDisconnected", (body)=>{
            const {producerUsername} = body;
    
            if(producerUsername === creatorUsername){
                document.getElementById(`remote-${producerUsername}`).style = "display: none";
            }
    
            delete remoteStreams[`${producerUsername}`];
            
            deleteInRoomUser(producerUsername);
            refresh();
        })


        return ()=>{
            socket.off("producerTransportCreated");
            socket.off("receiverTransportCreated");
            socket.off("newProducer");
            socket.off("newConsumer");
            socket.off("producerDisconnected");
        }

    }, [])

    React.useEffect(()=>{

        const begin = async ()=>{

            localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localStream.getAudioTracks()[0].enabled = false;
            localStream.getVideoTracks()[0].enabled = false;
            refresh();

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


    // async function test(){

    //     // console.log(remoteStreams);
    //     socket.emit("test", {
    //         roomID: currentRoomID,
    //         username: "qq"
    //     })
    // }

    // socket.on("test", (body)=>{
    //     console.log(body.room);
    // })

    return (
        <div class="d-flex align-items-stretch" style={{minHeight: "100vh"}}>
            <RoomSideBar>
                <WaitingList isCreator={creatorUsername === user.username} waitingUsers={waitingUsers} acceptUser={acceptUser} rejectUser={rejectUser}/>
                <hr className="m-1 mt-4"/>
                <InRoomUsers isCreator={creatorUsername === user.username} user={user} inRoomUsers={inRoomUsers} kickUser={kickUser}/>
            </RoomSideBar>

            <RoomMiddle>
                
                <RoomMiddleTop
                    creatorUsername = {creatorUsername}
                    roomTopic = {roomTopic} 
                    messagesElements = {messagesElements}
                    user = {user}
                    localVideoRef = {localVideoRef} 
                    roomType = {roomType}
                    message = {message}
                    remoteStreams = {remoteStreams}
                    onMessageChange = {onMessageChange}
                    sendMessage = {sendMessage}>
                </RoomMiddleTop>
                <hr/>
                <RoomMiddleDown 
                    isCreator = {creatorUsername === user.username}
                    endRoom = {endRoom}
                    leaveRoom = {leaveRoom} 
                    videoControl = {videoControl}
                    audioControl = {audioControl}
                    videoIconParams = {videoIconParams}
                    audioIconParams = {audioIconParams}
                    roomType = {roomType}>
                </RoomMiddleDown>
            
            </RoomMiddle>
        </div>
    )
}

export default VideoRoom;