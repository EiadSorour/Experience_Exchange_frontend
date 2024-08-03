import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function RoomsHistoryPage(){

    const pageLimit = 5;

    const cookies = new Cookies();
    const navigate = useNavigate();

    const [rooms, setRooms] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const [searchingBy , setSearchingBy] = React.useState("");
    const [radioState , setRadioState] = React.useState("topic");
    const [joinedUsers, setJoinedUsers] = React.useState([]);
    const [currentPage , setCurrentPage] = React.useState(1);
    const [maxPageNumber, SetMaxPageNumber] = React.useState(0);

    React.useEffect(()=>{
        const prepareRooms = async ()=>{
            try{
                const url = process.env.REACT_APP_BACK_URL+"/rooms";
                const response = await axios.get(url , {params: {limit:pageLimit , page:currentPage} ,withCredentials:true});
                setRooms(response.data.data.rooms);
                SetMaxPageNumber(Math.ceil(response.data.data.count/pageLimit));
            }catch(error){
                cookies.remove("access_token", {path:"/"});
                await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
                navigate("/login");
            }
        }
        prepareRooms();
    }, [])

    function handleOnRadioChange(event){
        const id = event.target.id;
        setRadioState(id);
    }

    function handleOnSearchChange(event){
        const text = event.target.value;
        setSearchText(text);
    }

    async function handleOnSearch(){
        const url = process.env.REACT_APP_BACK_URL;
        var response;
        
        switch(radioState){
            case "roomID":
                response = await axios.get(url+"/rooms/id", {params: {limit:pageLimit , page:1, roomID:searchText},withCredentials: true});
                setRooms([response.data.data.room]);
                setCurrentPage(1);
                SetMaxPageNumber(1);
                return;
            case "creatorID":
                response = await axios.get(url+"/rooms/user/id", {params: {limit:pageLimit , page:1, creatorID:searchText},withCredentials: true});
                break;
            case "creatorUsername":
                response = await axios.get(url+"/rooms/user/username", {params: {limit:pageLimit , page:1, creatorUsername:searchText},withCredentials: true});
                break;
            case "topic":
                response = await axios.get(url+"/rooms/topic", {params: {limit:pageLimit , page:1, topic:searchText},withCredentials: true});
                break;
        }
        
        const searchedRooms = response.data.data.rooms;
        const count = response.data.data.count;
        setSearchingBy(radioState);
        setRooms(searchedRooms);
        setCurrentPage(1);
        SetMaxPageNumber(Math.ceil(count/pageLimit) || 1);
    }

    async function getUsersJoined(args, event){
        event.preventDefault();
        const roomID = args[0];
        const url = process.env.REACT_APP_BACK_URL;
        const response = await axios.get(url+"/user-rooms", {params: {roomID:roomID}, withCredentials: true});
        const users = response.data.data.users;
        setJoinedUsers(users);
    }

    function handleOnReset(){
        window.location.reload();
    }

    async function handleOnNextPage(event){
        event.preventDefault();
        
        const url = process.env.REACT_APP_BACK_URL;
        var response;
        
        if(currentPage !== maxPageNumber){
            switch(searchingBy){
                case "creatorID":
                    response = await axios.get(url+"/rooms/user/id", {params: {limit:pageLimit , page:(currentPage+1), creatorID:searchText},withCredentials: true});
                    break;
                case "creatorUsername":
                    response = await axios.get(url+"/rooms/user/username", {params: {limit:pageLimit , page:(currentPage+1), creatorUsername:searchText},withCredentials: true});
                    break;
                case "topic":
                    response = await axios.get(url+"/rooms/topic", {params: {limit:pageLimit , page:(currentPage+1), topic:searchText},withCredentials: true});
                    break;
                default:
                    response = await axios.get(url+"/rooms", {params: {limit:pageLimit , page:(currentPage+1), topic:searchText},withCredentials: true});
            }

            setRooms(response.data.data.rooms);
            setCurrentPage(currentPage+1);
        }
    }

    async function handleOnPreviousePage(event){
        event.preventDefault();
        
        const url = process.env.REACT_APP_BACK_URL;
        var response;
        
        if(currentPage !== 1){
            switch(searchingBy){
                case "creatorID":
                    response = await axios.get(url+"/rooms/user/id", {params: {limit:pageLimit , page:(currentPage-1), creatorID:searchText},withCredentials: true});
                    break;
                case "creatorUsername":
                    response = await axios.get(url+"/rooms/user/username", {params: {limit:pageLimit , page:(currentPage+-1), creatorUsername:searchText},withCredentials: true});
                    break;
                case "topic":
                    response = await axios.get(url+"/rooms/topic", {params: {limit:pageLimit , page:(currentPage-1), topic:searchText},withCredentials: true});
                    break;
                default:
                    response = await axios.get(url+"/rooms", {params: {limit:pageLimit , page:(currentPage-1), topic:searchText},withCredentials: true});
            }

            setRooms(response.data.data.rooms);
            setCurrentPage(currentPage-1);
        }
    }
    
    if(rooms){
        return (
            <div className="container p-0 text-center mx-auto position-absolute top-50 start-50 translate-middle">
            
                <div className="row">
                    <h6 className="col-12">Search by:</h6>
                </div>
                
                <div className="row mb-2 justify-content-center">
                    <div>
                        <div className="text-start form-check form-check-inline">
                            <input checked={radioState === "roomID"? "checked": ""} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="roomID" value="option1"/>
                            <label className="form-check-label" for="roomID">roomID</label>
                        </div>
                        <div className="text-start form-check form-check-inline col">
                            <input checked={radioState === "creatorID"? "checked": ""} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="creatorID" value="option2"/>
                            <label className="form-check-label" for="creatorID">creatorID</label>
                        </div>
                        <div className="text-start form-check form-check-inline col">
                            <input checked={radioState === "creatorUsername"? "checked": ""} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="creatorUsername" value="option3"/>
                            <label className="form-check-label" for="creatorUsername">creator username</label>
                        </div>
                        <div className="text-start form-check form-check-inline col">
                            <input checked={radioState === "topic"? "checked": ""} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="topic" value="option4"/>
                            <label className="form-check-label" for="topic" >Topic</label>
                        </div>
                    </div>
                </div>



                <div className="row mb-4 justify-content-center">
                    <input onChange={handleOnSearchChange} style={{maxWidth:"500px"}} type="text" class="form-control col-10" placeholder="Search"/>
                    <button onClick={handleOnSearch} class="btn btn-primary ms-2 col-1">Search</button>
                    <button onClick={handleOnReset} class="btn btn-secondary ms-2 col-1">Reset</button>
                </div>




                <div class="row ">
                    <div class="col-8">
                        <table class="table table-bordered table-striped">
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">RoomID</th>
                                    <th scope="col">Topic</th>
                                    <th scope="col">CreatorID</th>
                                    <th scope="col">Creator Username</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {rooms.map((room, index)=>{
                                    return (
                                        <tr>
                                            <td>{room.roomID}</td>
                                            <td>{room.topic}</td>
                                            <td>{room.creatorID}</td>
                                            <td>{room.creatorUsername}</td>
                                            <td><button onClick={getUsersJoined.bind(this, [room.roomID])} className="btn btn-success">Users Joined</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li onClick={handleOnPreviousePage} class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">{currentPage}</a></li>
                                <li onClick={handleOnNextPage} class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    
                    </div>
                    <div style={{maxHeight:"450px"}} class="col-4 overflow-auto">
                        <table  class="table table-bordered table-striped ">
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">userID</th>
                                    <th scope="col">Username</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {joinedUsers.map((joinedUser)=>{
                                    return(
                                        <tr>
                                            <td>{joinedUser.userID}</td>
                                            <td>{joinedUser.username}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <Link to={"/admin/options"} className="col-1 btn btn-primary">Back</Link>
                </div>
            </div>
        );
    }else{
        return(<h1>Loading....</h1>);
    }
}

export default RoomsHistoryPage;