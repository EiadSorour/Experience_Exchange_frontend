import React from "react";

function LoginPage(){

    const [userData, setUserData] = React.useState(
        {
            username: "",
            password: ""
        }
    );

    const [passwordTypes, setPasswordTypes] = React.useState(
        {
            passwordType: "password",
            passIcon: "fa-solid fa-eye"
        }
    );

    function handleOnChange(event){
        const changeName = event.target.id;
        const currentValue = event.target.value;
        setUserData((prev)=>{
            return(
                {
                    ...prev,
                    [changeName]: currentValue
                }
            )
        })
    }

    function handleOnClick(event){
        event.preventDefault();
        const clickBtn = event.target.id;
        console.log(clickBtn);
        if(clickBtn === "btnPassword" || clickBtn === "passIcon"){
            setPasswordTypes((prev)=>{
                if(prev.passwordType === "password"){
                    return {
                        ...prev,
                        passwordType: "text",
                        passIcon: "fa-solid fa-eye-slash"
                    }
                }else{
                    return {
                        ...prev,
                        passwordType: "password",
                        passIcon: "fa-solid fa-eye"
                    }
                }
            })
        }
    }

    return (
        <main className="form-signin m-auto position-absolute top-50 start-50 translate-middle">
            <form className="text-center">
                <p className="m-0" style={{color:"red"}}></p>
                
                <h1 className="h3 mb-3 fw-bold">Login</h1>

                <div className="form-floating p-0 mb-2">
                    <input onChange={handleOnChange} type="text" className="form-control" id="username" placeholder="Username"/>
                    <label htmlFor="username">Username</label>
                </div>
                
                <div className="form-floating p-0">
                    <input onChange={handleOnChange} style={{minWidth: "120px"}} type={passwordTypes.passwordType} className="form-control" id="password" placeholder="Password"/>
                    <label htmlFor="password">Password</label>
                    <button onClick={handleOnClick} id="btnPassword" className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i id="passIcon" className={passwordTypes.passIcon}></i></button>
                </div>

                <button className="btn btn-primary fw-bold w-100 py-2 my-3" type="submit">Login</button>
                
                <p>Don't have an account? <a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="http://localhost:3000">Sign Up</a></p>
            </form>
        </main>
    )
}

export default LoginPage;