import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function UsersPage() {
    
    const pageLimit = 5;
    const cookies = new Cookies();
    const navigate = useNavigate();
    
    const [users, setUsers] = React.useState([]);
    const [maxPageNumber, SetMaxPageNumber] = React.useState(0);
    const [currentPage , setCurrentPage] = React.useState(1);
    const [searchText, setSearchText] = React.useState("");
    const [searchingByUsername, setSearchingByUsername] = React.useState(false);
    const [searchingById , setSearchingById] = React.useState(false);
    const [urlSearchText, setUrlSearchText] = React.useState("");
    const [radioStates , setRadioStates] = React.useState({
        id: "",
        username: "checked"
    });
    
    React.useEffect(()=>{
        const prepareUsers = async ()=>{
            try{
                const url = process.env.REACT_APP_BACK_URL+"/users";
                const response = await axios.get(url , {params: {limit:pageLimit , page:currentPage} ,withCredentials:true});
                setUsers(response.data.data.users);
                SetMaxPageNumber(Math.ceil(response.data.data.count/pageLimit));
            }catch(error){
                cookies.remove("access_token", {path:"/"});
                await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
                navigate("/login");
            }
        }
        prepareUsers();
    }, [])

    function handleIdRadio(){
        setRadioStates({
            id: "checked",
            username: ""
        })
    }

    function handleUsernameRadio(){
        setRadioStates({
            id: "",
            username: "checked"
        })
    }

    async function handleOnNextPage(event){
        event.preventDefault();
        var url;
        var response;
        if(currentPage !== maxPageNumber){
            try{
                if(searchingByUsername){
                    url = process.env.REACT_APP_BACK_URL+"/users/username";
                    response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage+1), username:urlSearchText} ,withCredentials:true});
                }else if(searchingById){
                    url = process.env.REACT_APP_BACK_URL+"/users/id";
                    response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage+1), id:urlSearchText} ,withCredentials:true});
                }else{
                    console.log("here");
                    url = process.env.REACT_APP_BACK_URL+"/users";
                    response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage+1)} ,withCredentials:true});
                }
                setUsers(response.data.data.users);
                setCurrentPage(currentPage+1);
            }catch(error){
                cookies.remove("access_token", {path:"/"});
                await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
                navigate("/login");
            }
        }
    }

    async function handleOnPreviousePage(event){
        event.preventDefault();
        var url;
        var response;
        if(currentPage !== 1){
            try{
                console.log("id" , searchingById);
                console.log("name" , searchingByUsername);
                if(searchingByUsername){
                    url = process.env.REACT_APP_BACK_URL+"/users/username";
                    response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage-1), username:urlSearchText} ,withCredentials:true});
                }else if(searchingById){
                    url = process.env.REACT_APP_BACK_URL+"/users/id";
                    response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage-1), id:urlSearchText} ,withCredentials:true});
                }else{
                    url = process.env.REACT_APP_BACK_URL+"/users";
                    response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage-1)} ,withCredentials:true});
                }
                setUsers(response.data.data.users);
                setCurrentPage(currentPage-1);
            }catch(error){
                cookies.remove("access_token", {path:"/"});
                await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
                navigate("/login");
            }
        }
    }

    async function handleSearch(){
        setUrlSearchText(searchText);
        if(radioStates.id === "checked"){
            const url = process.env.REACT_APP_BACK_URL+"/users/id";
            const response = await axios.get(url, {params: {limit:pageLimit , page:1, id:searchText},withCredentials: true});
            console.log(response);
            const user = response.data.data.user;
            setSearchingByUsername(false);
            setSearchingById(true);
            setCurrentPage(1);
            setUsers([user]);
            SetMaxPageNumber(1);
        }else{
            const url = process.env.REACT_APP_BACK_URL+"/users/username";
            const response = await axios.get(url, {params: {limit:pageLimit , page:1, username:searchText},withCredentials: true});
            const users = response.data.data.users;
            const count = response.data.data.count;
            setSearchingByUsername(true);
            setSearchingById(false);
            setCurrentPage(1);
            setUsers(users);
            SetMaxPageNumber(Math.ceil(count/pageLimit) || 1);
        }
    }

    async function blockUnblock(args , event){
        event.preventDefault();
        const user = args[0];
        const url = process.env.REACT_APP_BACK_URL+"/users/block";
        const response = await axios.patch(url, {} ,{params: {id:user.userID},withCredentials: true});
        const newUser = response.data.data.user;
        
        const buttonID = event.target.id;
        const btn = document.getElementById(buttonID);

        if(newUser.isBlocked){
            btn.classList.remove(["btn-danger"]);
            btn.classList.add(["btn-success"]);
            btn.textContent = "unblock";
        }else{
            btn.classList.remove(["btn-success"]);
            btn.classList.add(["btn-danger"]);
            btn.textContent = "block";
        }
    }
    
    async function deleteUser(args, event){
        event.preventDefault();

        const user = args[0];
        const url = process.env.REACT_APP_BACK_URL+"/users";
        await axios.delete(url , {params: {id:user.userID} , withCredentials:true});

        const buttonID = event.target.id;
        const btn = document.getElementById(buttonID);

        btn.parentNode.parentNode.childNodes.forEach(child => {
            child.lastChild.disabled = true;
        });
    }

    async function addRemoveAdmin(args, event){
        event.preventDefault();
        const user = args[0];
        const url = process.env.REACT_APP_BACK_URL+"/users/admin";
        const response = await axios.patch(url, {} ,{params: {id:user.userID},withCredentials: true});
        const newUser = response.data.data.user;
        
        const buttonID = event.target.id;
        const btn = document.getElementById(buttonID);

        if(newUser.role === "client"){
            btn.classList.remove(["btn-danger"]);
            btn.classList.add(["btn-success"]);
            btn.textContent = "Make Admin";
        }else{
            btn.classList.remove(["btn-success"]);
            btn.classList.add(["btn-danger"]);
            btn.textContent = "Remove Admin";
        }
    }

    function handleOnSearchChange(event){
        const text = event.target.value;
        setSearchText(text);
    }

    function handleOnReset(){
        window.location.reload();
    }

    if(users){
        return(
            <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
            
            <h6>Search by:</h6>
            
            <div>
                <div className="text-start form-check form-check-inline">
                    <input onClick={handleIdRadio} checked={radioStates.id} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                    <label onClick={handleIdRadio} className="form-check-label" for="inlineRadio1">userID</label>
                </div>
                <div className="text-start form-check form-check-inline">
                    <input onClick={handleUsernameRadio} checked={radioStates.username} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                    <label onClick={handleUsernameRadio} className="form-check-label" for="inlineRadio2">username</label>
                </div>
            </div>

            <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
                <input onChange={handleOnSearchChange} style={{minWidth: "120px"}} type="text" class="form-control" placeholder="Search"/>
                <button onClick={handleSearch} class="btn btn-primary ms-2">Search</button>
                <button onClick={handleOnReset} class="btn btn-secondary ms-2">Reset</button>
            </div>


            <table class="table table-bordered table-striped">
                <thead className="table-secondary">
                    <tr>
                        <th scope="col">userID</th>
                        <th scope="col">username</th>
                        <th scope="col">profession</th>
                        <th scope="col">role</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index)=>{
                        return (
                            <tr>
                                <td>{user.userID}</td>
                                <td>{user.username}</td>
                                <td>{user.profession}</td>
                                <td>{user.role}</td>
                                <td name="button"><button id={`block_${index}`} onClick={blockUnblock.bind(this , [user])} className={user.isBlocked === false? "btn btn-danger":"btn btn-success"}>{user.isBlocked === true? "unblock": "Block"}</button></td>
                                <td name="button"><button id={`delete_${index}`} onClick={deleteUser.bind(this,[user])} className="btn btn-danger">Delete</button></td>
                                <td name="button"><button id={`admin_${index}`} onClick={addRemoveAdmin.bind(this,[user])} className={user.role === "admin"? "btn btn-danger":"btn btn-success"}>{user.role === "admin"? "Remove Admin":"Make Admin"}</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="position-relative">
                <nav aria-label="Page navigation example" className="position-absolute mt-3 top-50 start-50 translate-middle">
                    <ul className="pagination">
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
            
            <Link to={"/admin/options"} className="btn btn-primary position-absolute top-100 start-0 mt-5">Back</Link>
        </div>
        );
    }else{
        return <h1>loading...</h1>;
    }
}

export default UsersPage;
