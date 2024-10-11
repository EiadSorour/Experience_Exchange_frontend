import React from "react";

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
                <div className="d-flex flex-column align-items-start rounded p-1 bg-success" style={{ height:"auto" ,width:"auto", textAlign:"start" , wordBreak: "break-word"}}>
                    <div className="mx-2">{message}</div>
                </div>
            </div>
        )
    }
}

export default Message;