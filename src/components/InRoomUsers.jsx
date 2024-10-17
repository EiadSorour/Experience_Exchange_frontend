import React from "react";

function InRoomUsers({isCreator , user , inRoomUsers , kickUser}){
    return (
        <div>
            <h4 className="mt-4 text-info">In Room</h4>
            {Object.keys(inRoomUsers).map((username)=>{
                if(username != user.username){
                    return(
                        <div className="d-flex justify-content-center align-items-baseline m-3">
                            <h6>{username}</h6>
                            {isCreator? <button onClick={ kickUser.bind(this , [username]) } className="btn btn-danger ms-3">Kick</button>: <></>}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default InRoomUsers;