import React from "react";

function RoomMiddle({isChatRoom , roomTopic , user , localVideoRef , remoteStreams , messagesElements , message , onMessageChange , sendMessage}){
    if(isChatRoom){
        // return 
    }else{
        return (
            <div className="text-center" style={{height:"85vh"}}>
                <h1 className="pt-2"><span className="text-info">Topic:</span> {roomTopic}</h1>
                
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column me-auto flex-wrap justify-content-center">
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
    
                    <div className="me-2" style={{borderLeft: "1px solid #adb5bd"}}></div>
                    <div style={{minWidth: "400px"}}>
    
                        <div className="d-flex text-start flex-column" style={{overflow: "auto" , height: "60vh", scrollbarWidth: "none"}}>
                            {messagesElements}
                        </div>
                        <div className="d-flex flex-row mt-5">
                            <textarea onChange={onMessageChange} value={message} style={{minWidth: "80px", resize: "none", scrollbarWidth: "none"}} type="text" class="form-control" placeholder="message"/>
                            <button onClick={sendMessage} className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-paper-plane fa-xl"></i></button>
                        </div>
    
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomMiddle;