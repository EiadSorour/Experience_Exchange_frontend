import React from "react";

function AdminOptionsPage(probs){
    return (
        <div class="text-center d-grid gap-2 col-3 mx-auto position-absolute top-50 start-50 translate-middle">
            <h3>Welcome, <span className="text-decoration-underline fw-bold ">Eiad</span></h3>
            <button class="btn btn-primary" type="button">Users</button>
            <button class="btn btn-primary" type="button">Rooms Hirstory</button>
            <a className="link-danger link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Logout</a>
        </div>
    )
}

export default AdminOptionsPage;