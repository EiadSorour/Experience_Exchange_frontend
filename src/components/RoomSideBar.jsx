import React from "react";

function RoomSideBar({waitingUsers , acceptUser , rejectUser, inRoomUsers, kickUser}){
    return (
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
    )
}

export default RoomSideBar;