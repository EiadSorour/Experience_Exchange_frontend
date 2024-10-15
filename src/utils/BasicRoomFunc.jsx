import { jwtDecode } from "jwt-decode";
import React from "react";
import Cookies from "universal-cookie";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

let waitingUsers = {};
let inRoomUsers = {};

const BasicRoomFunctionalities = (socket, roomType)=>{
    
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    const user = jwtDecode(token);
    const {currentRoomID} = useParams();

    const [roomTopic, setRoomTopic] = React.useState("");
    const [creatorUsername, setCreatorUsername] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [messagesElements ,setMessagesElements] = React.useState([]);
    const [dummy, reRender] = React.useState(0);

    React.useEffect(()=>{

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

        socket.on("gotMessage" , (body)=>{
            console.log("heeeereee");
            const {username , message} = body;
            const key = messagesElements.length + 1;
            setMessagesElements((prev)=>{
                return (
                    [...prev, <Message key={key} message={message} username={username}></Message>]
                )
            });
    
        });

        return ()=>{
            socket.off("gotRoomData");
            socket.off("roomEnded");
            socket.off("userKicked");
            socket.off("newMember");
            socket.off("gotUsersWaiting");
            socket.off("mustWait");
            socket.off("gotMessage");
        }

    }, [])

    React.useEffect(()=>{
        socket.emit("gotUsername", {username: user.username , roomID: currentRoomID});
        socket.emit("getRoomData" , {roomID: currentRoomID, username: user.username});
    }, [])

    const endRoom = ()=>{
        socket.emit("endRoom", {roomID:currentRoomID, roomType: roomType});
    }

    const leaveRoom = ()=>{
        window.location.href = `/client/options`;
    }

    const kickUser = (args , event)=>{
        event.preventDefault();
        const usernameToKick = args[0];
        socket.emit("kickClient" , { usernameToKick , roomID: currentRoomID , clientId: inRoomUsers[`${usernameToKick}`]});
    }

    const acceptUser = (args , event)=>{
        event.preventDefault();

        const username = args[0];
        const userId = waitingUsers[`${username}`][`id`];

        socket.emit("acceptUser" , {roomID:currentRoomID , roomType: roomType ,acceptedUsername: username  , acceptedId: userId});
    }
    
    const rejectUser = (args , event)=>{
        event.preventDefault();
        
        const username = args[0];
        const userId = waitingUsers[`${username}`][`id`];

        socket.emit("rejectUser" , {roomID:currentRoomID , rejectedUsername: username  , rejectedId: userId});
    }

    const sendMessage = (event)=>{
        event.preventDefault();
        if(message.trim().length > 0){
            setMessage("");
            const key = messagesElements.length + 1;
            setMessagesElements((prev)=>{
                return (
                    [...prev, <Message key={key} message={message}></Message>]
                )
            });
            socket.emit("sendMessage" , {roomID: currentRoomID, username: user.username , message: message});
        }
    }

    const onMessageChange = (event)=>{
        const message = event.target.value;
        setMessage(message);
    }

    const deleteInRoomUser = (username)=>{
        delete inRoomUsers[`${username}`];
    }

    const refresh = (username)=>{
        reRender((prev)=>prev+1);
    }


    return {
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
    }
}

export default BasicRoomFunctionalities;