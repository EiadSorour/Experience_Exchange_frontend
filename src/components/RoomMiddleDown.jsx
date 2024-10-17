import React from "react";

function RoomMiddleDown({isCreator , message, onMessageChange , sendMessage, endRoom , leaveRoom , videoControl, audioControl, videoIconParams, audioIconParams , roomType}){
    if(roomType === "Video"){
        return (
            <div className="d-flex text-center" style={{height:"10vh"}}>
                <button onClick={videoControl} className="btn btn-dark"><i id="videoIcon" style={{color: videoIconParams.color}} className={videoIconParams.class}></i></button>
                <button onClick={audioControl} className="btn btn-dark"><i id="audioIcon" style={{color: audioIconParams.color}} className={audioIconParams.class}></i></button>
                {<button onClick={isCreator? endRoom : leaveRoom} className="btn btn-danger m-3 ms-auto">{isCreator? "End Room" : "Leave Room"}</button>}
            </div>
        )
    }else{
        return (
            <div className="d-flex text-center" style={{height:"10vh"}}>
                <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
                    <textarea onChange={onMessageChange} value={message} style={{minWidth: "120px", resize: "none", scrollbarWidth: "none"}} type="text" class="form-control" placeholder="message"/>
                    <button onClick={sendMessage} className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-paper-plane fa-xl"></i></button>
                </div>
                {<button onClick={isCreator? endRoom : leaveRoom} className="btn btn-danger m-3 ms-auto">{isCreator? "End Room" : "Leave Room"}</button>}
            </div>
        )
    }
}

export default RoomMiddleDown;