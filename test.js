var availableRooms = {
    "12345": {
        topic: "art",
        creatorProf: "ai engineer",
        creatorUsername: "eiad sorour",
        router: {},
        transports: {
            "username1":{
                sendTransport: {},
                receiveTramsport: {},
                producers: {
                    "audio": {},
                    "video": {},
                },
                consumers: {
                    "producer1Username-audio": {},
                    "producer1Username-video": {},
                }
            },
        }
    },
    "121212": {
        topic: "science",
        creatorProf: "doctor",
        creatorUsername: "adham tarek",
        router: {},
        transports: {
            "username1":{
                sendTransport: {},
                receiveTramsport: {},
                producers: {
                    "audio": {},
                    "video": {},
                },
                consumers: {
                    "producer1Username-audio": {},
                    "producer1Username-video": {},
                }
            },
        }
    },
    "wwww": {
        topic: "animia",
        creatorProf: "doctor",
        creatorUsername: "adham tarek",
        router: {},
        transports: {
            "username1":{
                sendTransport: {},
                receiveTramsport: {},
                producers: {
                    "audio": {},
                    "video": {},
                },
                consumers: {
                    "producer1Username-audio": {},
                    "producer1Username-video": {},
                }
            },
        }
    },
};


Object.entries(availableRooms).forEach(([key,value])=>{
    console.log(value);
})


// var testObj = {
//     "5536bff7-c70d-4d2c-bfa1-7266d0aaaccb": {name: "eiad"},
//     "5be5dda4-1f0f-4d84-bf63-d02b4fc4349f": {name: "mohamed"},
//     "2ec33d7e-a396-4c4e-a776-d518a380465b": {name: "ahmed"},
// }

// const rooms = Object.fromEntries(
//     Object.entries(availableRooms).filter(([key, value]) => value.topic.includes("a".toLowerCase()))
// );

// availableRooms["eiad"] = "alooo";

// console.log(testObj);

// var newObj = {"f52c5c2b-c425-4b6d-9c55-9a7fcd2cedc4": {name: "maher"}};

// testObj = {
//     ...newObj,
//     ...testObj
// }



// return (
//     <tbody>
//         <tr>
//             <td scope="row" className="text-capitalize"><span className="fw-bold text-danger">Room Topic:</span> {room.topic}</td>
//             <td onClick={joinRoom.bind(this , [room])} rowSpan={3}><button className="btn btn-success">Ask to join</button></td>
//         </tr>
//         <tr>
//             <td scope="row" className="text-capitalize"><span className="fw-bold text-danger">Creator:</span> {room.creatorUsername}</td>
//         </tr>
//         <tr>
//             <td scope="row" className="text-capitalize"><span className="fw-bold text-danger">Creator profession:</span> {room.creatorProf}</td>
//         </tr>
//         <tr><td colSpan={2}><hr/></td></tr>
//     </tbody>
// )