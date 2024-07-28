import React from "react";
import { Link } from "react-router-dom";

function RoomsHistoryPage(){

    const [searchText, setSearchText] = React.useState("");
    const [radioStates , setRadioStates] = React.useState({
        roomID: "",
        creatorID: "",
        creatorUsername: "",
        topic: "checked"
    });

    function handleOnRadioChange(event){
        const id = event.target.id;
        setRadioStates({
            roomID: "",
            creatorID: "",
            creatorUsername: "",
            topic: "",
            [id]: "checked"
        });
    }

    function handleOnSearchChange(event){
        const text = event.target.value;
        setSearchText(text);
    }

    function handleOnReset(){
        window.location.reload();
    }

    return (
        <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
            
            <h6>Search by:</h6>
            
            <div>
                <div className="text-start form-check form-check-inline">
                    <input checked={radioStates.roomID} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="roomID" value="option1"/>
                    <label className="form-check-label" for="roomID">roomID</label>
                </div>
                <div className="text-start form-check form-check-inline">
                    <input checked={radioStates.creatorID} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="creatorID" value="option2"/>
                    <label className="form-check-label" for="creatorID">creatorID</label>
                </div>
                <div className="text-start form-check form-check-inline">
                    <input checked={radioStates.creatorUsername} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="creatorUsername" value="option3"/>
                    <label className="form-check-label" for="creatorUsername">creator username</label>
                </div>
                <div className="text-start form-check form-check-inline">
                    <input checked={radioStates.topic} onClick={handleOnRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="topic" value="option4"/>
                    <label className="form-check-label" for="topic" >Topic</label>
                </div>
            </div>

            <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
                <input onChange={handleOnSearchChange} style={{minWidth: "120px"}} type="text" class="form-control" placeholder="Search"/>
                <button class="btn btn-primary ms-2">Search</button>
                <button onClick={handleOnReset} class="btn btn-secondary ms-2">Reset</button>
            </div>
            
            <Link to={"/admin/options"} className="btn btn-primary position-absolute top-100 start-0 mt-5">Back</Link>
        </div>
    )
}

export default RoomsHistoryPage;