import React from "react";
import { useSocket } from "../utils/SocketContex";
import BasicRoomFunctionalities from "../utils/BasicRoomFunc";
import RoomSideBar from "../components/RoomSideBar";
import InRoomUsers from "../components/InRoomUsers";
import WaitingList from "../components/WaitingList";
import RoomMiddle from "../components/RoomMiddle";
import RoomMiddleTop from "../components/RoomMiddleTop";
import RoomMiddleDown from "../components/RoomMiddleDown";


function ChatRoom(){

    const roomType = "Chat";
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

    React.useEffect(()=>{

        socket.on("userLeftChat", (body)=>{
            const {username} = body;
            deleteInRoomUser(username);
            refresh();
        })

        return ()=>{
            socket.off("userLeftChat");
        }

    }, [])

    React.useEffect(() => {
        
        const handleTabClose = (event) => {
            socket.emit("leavingChat" , {username: user.username , roomID: currentRoomID});
        };

        window.addEventListener('beforeunload', handleTabClose);

    }, [socket]);



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
                <RoomMiddleTop roomTopic={roomTopic} messagesElements={messagesElements} roomType={roomType}></RoomMiddleTop>
                <hr/>
                <RoomMiddleDown 
                    isCreator={creatorUsername === user.username}
                    message={message} 
                    onMessageChange={onMessageChange} 
                    sendMessage={sendMessage} 
                    endRoom={endRoom} 
                    leaveRoom={leaveRoom}
                    roomType={roomType}>
                </RoomMiddleDown>
            </RoomMiddle>
        </div>
    )
}

export default ChatRoom;