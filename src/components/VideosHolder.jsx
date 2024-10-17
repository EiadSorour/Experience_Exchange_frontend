import React from "react";

function VideosHolder({user, localVideoRef, remoteStreams , creatorUsername}){
    if(creatorUsername === user.username){
        return (
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
        )
    }else{
        return (
            <div className="d-flex flex-column me-auto flex-wrap justify-content-center">
                {remoteStreams[`${creatorUsername}`] ? 
                    <div className="m-3">
                        <h5 className="text-secondary">{creatorUsername}</h5>
                        <video id={`remote-${creatorUsername}`} style={{width:"400px" , height:"220px"}} autoPlay></video>
                    </div>
                : <></>}
                <div id="videos" className="d-flex flex-wrap justify-content-center">
                    <div className="m-1">
                        <h5 className="text-secondary">{user.username}</h5>
                        <video ref={localVideoRef} id="localVideo" style={{width:"50px" , height:"50px"}} autoPlay></video>
                    </div>
                    {Object.keys(remoteStreams).map((key)=>{
                        if(key !== creatorUsername){
                            return (
                                <div className="m-1">
                                    <h5 className="text-secondary">{key}</h5>
                                    <video id={`remote-${key}`} style={{width:"50px" , height:"50px"}} autoPlay></video>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default VideosHolder;