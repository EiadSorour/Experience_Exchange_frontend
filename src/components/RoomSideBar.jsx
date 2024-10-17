import React from "react";

function RoomSideBar(props){
    return (
        <div className="text-center" style={{width:"30%" , height:"100vh" , overflowY:"scroll", scrollbarWidth: "thin"}}>
            {props.children}
        </div>
    )
}

export default RoomSideBar;