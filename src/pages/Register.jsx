import React from "react";

function RegisterPage(){
    
    const [userData, setUserData] = React.useState(
        {
            username: "",
            password: "",
            confirmPassword: "",
            profession: ""
        }
    );

    const [passwordTypes, setPasswordTypes] = React.useState(
        {
            passwordType: "password",
            confirmPasswordType: "password",
            passIcon: "fa-solid fa-eye",
            confirmPassIcon: "fa-solid fa-eye"
        }
    );

    function hanldeOnChange(event) {
        const changeName = event.target.id;
        setUserData((prev)=>{
            return(
                {
                    ...prev,
                    [changeName]: event.target.value
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
        }else{
            setPasswordTypes((prev)=>{
                if(prev.confirmPasswordType === "password"){
                    return {
                        ...prev,
                        confirmPasswordType: "text",
                        confirmPassIcon: "fa-solid fa-eye-slash"
                    }
                }else{
                    return {
                        ...prev,
                        confirmPasswordType: "password",
                        confirmPassIcon: "fa-solid fa-eye" 
                    }
                }
            })
        }
    }

    return (
        <main className="form-signin m-auto position-absolute top-50 start-50 translate-middle">
            <form className="container text-center ">
                <div className="row">
                    <h1 className="h3 mb-3 fw-bold">Sign Up</h1>
                </div>

                <div className="row mb-2 ">
                    <div className="form-floating p-0 col mx-1">
                        <input onChange={hanldeOnChange} type="text" className="form-control" id="username" placeholder="Username"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating p-0 col mx-1">
                        <input onChange={hanldeOnChange} type="text" className="form-control" id="profession" placeholder="profession"/>
                        <label htmlFor="profession">Profession</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-floating p-0 col mx-1 mb-2">
                        <input style={{minWidth: "120px"}} onChange={hanldeOnChange} type={passwordTypes.passwordType} className="form-control" id="password" placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                        <button onClick={handleOnClick} id="btnPassword" className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i id="passIcon" className={passwordTypes.passIcon}></i></button>
                    </div>
                    <div className="form-floating p-0 col mx-1 mb-2">
                        <input style={{minWidth: "190px"}} onChange={hanldeOnChange} type={passwordTypes.confirmPasswordType} className="form-control " id="confirmPassword" placeholder="Confirm Password"/>

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <button onClick={handleOnClick} id="btnConfirm" className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i id="confirmIcon" className={passwordTypes.confirmPassIcon}></i></button>
                    </div>
                </div>

                <p className="m-0" style={{color:"red"}}></p>

                <div className="row mb-1">
                    <button className="btn btn-primary fw-bold w-100 py-2 mt-3" type="submit">Sign Up</button>
                </div>

                <p>Already have an account? <a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="https://google.com">Login</a></p>
            </form>
        </main>
    )
}

export default RegisterPage;