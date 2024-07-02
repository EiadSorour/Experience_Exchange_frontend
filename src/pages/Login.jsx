import React from "react";
import axios from "axios";

function LoginPage(probs){

    const [userData, setUserData] = React.useState(
        {
            username: "",
            password: ""
        }
    );

    const [errorMessages, setErrorMessages] = React.useState([]);

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

    async function handleOnSubmit(event){
        event.preventDefault();
        const url = probs.BACK_URL+"/login";
        try{
            const response = await axios.post(url, userData);
            alert(response.data.data.token);
        }catch(error){
            const errorMessage = error.response.data.message;
            setErrorMessages((prev)=>{
                if(Array.isArray(errorMessage)){
                    return errorMessage;
                }else{
                    return([errorMessage])
                }
            });
        }
    }

    return (
        <main className="form-signin m-auto position-absolute top-50 start-50 translate-middle">
            <form className="text-center">
                {errorMessages.map((message)=>{
                    return (
                        <p className="m-0" style={{color:"red"}}>{message}</p>
                    )
                })}
                
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

                <button onClick={handleOnSubmit} className="btn btn-primary fw-bold w-100 py-2 my-3" type="submit">Login</button>
                
                <p>Don't have an account? <a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href={probs.FRONT_URL+"/register"}>Sign Up</a></p>
            </form>
        </main>
    )
}

export default LoginPage;