import React from "react";

function WaitingList({isCreator , waitingUsers , acceptUser , rejectUser}){
    return(
        <div>
            <h4 className="mt-4 text-info">Waiting</h4>
            {Object.keys(waitingUsers).map((username)=>{
                if(waitingUsers[`${username}`]['accepted'] == false){
                    return (
                        <div className="d-flex justify-content-center align-items-baseline m-2">
                            <h6>{username}</h6>
                            {isCreator? <button onClick={ acceptUser.bind(this , [username]) } className="btn btn-sm ms-1 btn-dark"><i style={{color: "green"}} className="fa-solid fa-circle-check fa-lg"></i></button>: <></>}
                            {isCreator? <button onClick={ rejectUser.bind(this , [username]) }  className="btn btn-sm btn-dark"><i style={{color: "red"}} className="fa-solid fa-circle-xmark fa-lg"></i></button>: <></>}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default WaitingList;