import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function UsersPage() {

    const pageLimit = 5;

    const [users, setUsers] = React.useState([]);
    const [maxPageNumber, SetMaxPageNumber] = React.useState(0);
    const[currentPage , setCurrentPage] = React.useState(1);

    React.useEffect(()=>{
        const prepareUsers = async ()=>{
            const url = process.env.REACT_APP_BACK_URL+"/users";
            const response = await axios.get(url , {params: {limit:pageLimit , page:currentPage} ,withCredentials:true});
            setUsers(response.data.data.users);
            SetMaxPageNumber(Math.ceil(response.data.data.count/pageLimit));
        }
        prepareUsers();
    }, [])

    async function handleOnNextPage(){
        if(currentPage !== maxPageNumber){
            const url = process.env.REACT_APP_BACK_URL+"/users";
            const response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage+1)} ,withCredentials:true});
            setUsers(response.data.data.users);
            setCurrentPage(currentPage+1);
        }
    }

    async function handleOnPreviousePage(){
        if(currentPage !== 1){
            const url = process.env.REACT_APP_BACK_URL+"/users";
            const response = await axios.get(url , {params: {limit:pageLimit , page:(currentPage-1)} ,withCredentials:true});
            setUsers(response.data.data.users);
            setCurrentPage(currentPage-1);
        }
    }

    if(users){
        return(
            <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
            
            <h6>Search by:</h6>
            
            <div>
                <div className="text-start form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                    <label className="form-check-label" for="inlineRadio1">userID</label>
                </div>
                <div className="text-start form-check form-check-inline">
                    <input checked className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                    <label className="form-check-label" for="inlineRadio2">username</label>
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
