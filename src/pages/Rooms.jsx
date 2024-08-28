import React from "react";
import { useLocation } from "react-router-dom";


function RoomPage(){
    
    const {state} = useLocation();
    const socket = state.socket;
    const roomTopic = state.roomTopic;

    console.log(`${socket.id} , || ${roomTopic}`);

    return (
        <div>
            <div class="d-flex align-items-stretch" style={{minHeight: "100vh"}}>
                <div className="text-center" style={{width:"30%" , height:"100vh" , overflowY:"scroll"}}>
                    <h4 className="mt-4 text-info">Waiting</h4>
                    {/* <div className="d-flex justify-content-center align-items-baseline m-2">
                        <h6>eiad sorour</h6>
                        <button className="btn btn-sm ms-1 btn-dark"><i style={{color: "green"}} className="fa-solid fa-circle-check fa-lg"></i></button>
                        <button className="btn btn-sm btn-dark"><i style={{color: "red"}} className="fa-solid fa-circle-xmark fa-lg"></i></button>
                    </div> */}
                    <hr className="m-1 mt-4"/>
                    <h4 className="mt-4 text-info">In Room</h4>
                    {/* <div className="d-flex justify-content-center align-items-baseline m-3">
                        <h6>user33</h6>
                        <button className="btn btn-danger ms-3">Kick</button>
                    </div> */}
                </div>

                <div style={{width:"100%" , height:"100vh"}}>
                    
                    <div className="text-center" style={{height:"85vh"}}>
                        <h1 className="pt-2"><span className="text-info">Topic:</span></h1>
                        <div className="d-flex flex-wrap justify-content-center">
                            <div className="m-3">
                                <h5 className="text-secondary">sss</h5>
                                <video id="localVideo" style={{width:"400px" , height:"220px"}} autoPlay></video>
                            </div>
                            <div className="m-3">
                                <h5 className="text-secondary">unknown</h5>
                                <video id="remoteVideo" style={{width:"400px" , height:"220px"}} autoPlay></video>
                            </div>

                            {/* Rest of users */}
                        </div>
                    </div>
                    <hr/>
                    <div className="d-flex text-center" style={{height:"10vh"}}>
                        <button className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-video fa-2xl"></i></button>
                        <button className="btn btn-dark"><i style={{color: "#3776e1"}} className="fa-solid fa-microphone fa-2xl"></i></button>
                        <button className="btn btn-danger m-3 ms-auto">End Room</button>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default RoomPage;