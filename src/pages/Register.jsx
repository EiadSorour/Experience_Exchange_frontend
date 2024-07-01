import React from "react";

function RegisterPage(props){

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

    const [errors, setErrors] = React.useState(
        {
            serverError: "",
            passwordError: "",
            confirmPassClass: "form-control"
        }
    );

    function hanldeOnChange(event) {
        const changeName = event.target.id;
        const currentValue = event.target.value;
        setUserData((prev)=>{
            if(changeName === "confirmPassword"){
                if(currentValue === prev.password){
                    setErrors(
                        {
                            ...prev,
                            passwordError: "",
                            confirmPassClass: "form-control"
                        }
                    )
                }else{
                    setErrors(
                        {
                            ...prev,
                            passwordError: "Password must match",
                            confirmPassClass: "form-control border border-3 border-danger focus-ring focus-ring-danger"
                        }
                    )
                }
            }else if(changeName === "password"){
                if(currentValue === prev.confirmPassword){
                    setErrors(
                        {
                            ...prev,
                            passwordError: "",
                            confirmPassClass: "form-control"
                        }
                    )
                }else{
                    setErrors(
                        {
                            ...prev,
                            passwordError: "Password must match",
                            confirmPassClass: "form-control border border-3 border-danger focus-ring focus-ring-danger"
                        }
                    )
                }
            }
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
                <p className="m-0" style={{color:"red"}}>{errors.serverError}</p>
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
                    <div className="p-0 col mx-1 mb-2">
                        <div className="form-floating">
                            <input style={{minWidth: "120px"}} onChange={hanldeOnChange} type={passwordTypes.passwordType} className="form-control" id="password" placeholder="Password"/>
                            <label htmlFor="password">Password</label>
                            <button onClick={handleOnClick} id="btnPassword" className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i id="passIcon" className={passwordTypes.passIcon}></i></button>
                        </div>
                    </div>
                    <div className="p-0 col mx-1 mb-2">
                        <div className="form-floating">
                            <input style={{minWidth: "190px"}} onChange={hanldeOnChange} type={passwordTypes.confirmPasswordType} className={errors.confirmPassClass} id="confirmPassword" placeholder="Confirm Password"/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <button onClick={handleOnClick} id="btnConfirm" className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y me-1" ><i id="confirmIcon" className={passwordTypes.confirmPassIcon}></i></button>    
                        </div>
                        <p className="m-0" style={{color:"red"}}>{errors.passwordError}</p>
                    </div>
                </div>


                <div className="row mb-1">
                    <button className="btn btn-primary fw-bold w-100 py-2 mt-3" type="submit">Sign Up</button>
                </div>

                <p>Already have an account? <a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="http://localhost:3000/login">Login</a></p>
            </form>
        </main>
    )
}

export default RegisterPage;