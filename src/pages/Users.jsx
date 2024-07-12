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
        if(currentPage !== maxPageNumber){
            try{
                const url = process.env.REACT_APP_BACK_URL+"/users";
                const response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage+1)} ,withCredentials:true});
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
        if(currentPage !== 1){
            try{
                const url = process.env.REACT_APP_BACK_URL+"/users";
                const response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage-1)} ,withCredentials:true});
                setUsers(response.data.data.users);
                setCurrentPage(currentPage-1);
            }catch(error){
                cookies.remove("access_token", {path:"/"});
                await axios.get(process.env.REACT_APP_BACK_URL+"/logout", {withCredentials: true});
                navigate("/login");
            }
        }
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
                <input style={{minWidth: "120px"}} type="text" class="form-control" placeholder="Search"/>
                <button class="btn btn-primary ms-2">Search</button>
                <button class="btn btn-secondary ms-2">Reset</button>
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
                    {users.map((user)=>{
                        return (
                            <tr>
                                <td>{user.userID}</td>
                                <td>{user.username}</td>
                                <td>{user.profession}</td>
                                <td>{user.role}</td>
                                <td><button className={user.isBlocked === false? "btn btn-danger":"btn btn-success"}>{user.isBlocked === true? "unblock": "Block"}</button></td>
                                <td><button className="btn btn-danger">Delete</button></td>
                                <td><button className={user.role === "admin"? "btn btn-danger":"btn btn-success"}>{user.role === "admin"? "Remove Admin":"Make Admin"}</button></td>
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
