import React from "react";

function RegisterPage(){
    return (
        <main className="form-signin m-auto position-absolute top-50 start-50 translate-middle">
            <form className="container text-center">
                <div className="row">
                    <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
                </div>

                <div className="row mb-2">
                    <div className="form-floating p-0 col">
                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating p-0 col ms-1">
                        <input type="text" className="form-control" id="profession" placeholder="profession"/>
                        <label htmlFor="profession">Profession</label>
                    </div>
                </div>
                <div className="row d-flex">
                    <div className="form-floating p-0 col">
                        <input type="password" className="form-control" id="password" placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                        <button className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i className="fa-solid fa-eye"></i></button>
                    </div>
                    <div className="form-floating p-0 col ms-1 overflow-hidden">
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"/>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <button className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i className="fa-solid fa-eye"></i></button>
                    </div>
                </div>

                <p className="m-0" style={{color:"red"}}></p>

                <div className="row">
                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Sign Up</button>
                </div>

                <p>Already have an account ? <a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="https://google.com">Login</a></p>
            </form>
        </main>
    )
}

export default RegisterPage;