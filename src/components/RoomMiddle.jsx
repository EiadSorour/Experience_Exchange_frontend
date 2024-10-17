import React from "react";

function RoomMiddle(props){
    return ( 
        <div style={{width:"100%" , height:"100vh"}}>
            {props.children}
        </div>
    )
}

export default RoomMiddle;