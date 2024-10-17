import React from "react";
import VideosHolder from "./VideosHolder";

function RoomMiddleTop({roomTopic , creatorUsername , message, messagesElements, user , localVideoRef , remoteStreams , onMessageChange , sendMessage , roomType}){
    if(roomType === "Video"){
        return (
            <div className="text-center" style={{height:"85vh"}}>
                
                <h1 className="pt-2"><span className="text-info">Topic:</span> {roomTopic}</h1>
                
                <div className="d-flex flex-row">

                    <VideosHolder 
                        user = {user}
                        localVideoRef = {localVideoRef}
                        remoteStreams = {remoteStreams}
                        creatorUsername = {creatorUsername}>
                    </VideosHolder>

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
    }else{
        return (
            <div className="text-center" style={{height:"85vh"}}>
                <h1 className="pt-2 mb-5"><span className="text-info">Topic:</span> {roomTopic}</h1>
                <div className="d-flex text-start flex-column mx-4" style={{overflow: "auto" , height: "70vh", scrollbarWidth: "none"}}>
                    {messagesElements}
                </div>
            </div>
        )
    }
}

export default RoomMiddleTop;