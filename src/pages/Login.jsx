import React from "react";

function LoginPage(){
    return (
        <main className="form-signin m-auto position-absolute top-50 start-50 translate-middle">
            <form className="text-center">
                <p className="m-0" style={{color:"red"}}></p>
                
                <h1 className="h3 mb-3 fw-bold">Login</h1>

                <div className="form-floating p-0 mb-2">
                    <input type="text" className="form-control" id="username" placeholder="Username"/>
                    <label htmlFor="username">Username</label>
                </div>
                
                <div className="form-floating p-0">
                    <input style={{minWidth: "120px"}} type="password" className="form-control" id="password" placeholder="Password"/>
                    <label htmlFor="password">Password</label>
                    <button id="btnPassword" className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i id="passIcon" className="fa-solid fa-eye"></i></button>
                </div>

                <button className="btn btn-primary fw-bold w-100 py-2 my-3" type="submit">Login</button>
                
                <p>Don't have an account? <a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="http://localhost:3000/register">Sign Up</a></p>
            </form>
        </main>
    )
}

export default LoginPage;