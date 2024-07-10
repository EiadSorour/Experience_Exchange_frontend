import React from "react";

function UsersPage() {
    return (
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
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-danger">Block</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-danger">Block</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-success">unblock</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-danger">Block</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-danger">Remove Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-success">unblock</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
            </tbody>
        </table>

        <div className="position-relative">
            <nav aria-label="Page navigation example" className="position-absolute mt-3 top-50 start-50 translate-middle">
                <ul className="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link text-bg-primary" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <button className="btn btn-primary position-absolute top-100 start-0 mt-5">Back</button>
    </div>
    );
}

export default UsersPage;
