import React from "react";
import { useSocket } from "../utils/SocketContex";
import BasicRoomFunctionalities from "../utils/BasicRoomFunc";


function ChatRoom(){

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
    } = BasicRoomFunctionalities(socket , "Chat");

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