import { Link, useNavigate } from "react-router-dom";
import InputControl from "./InputControl";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase';

const SignUp= () =>{
    const navigate = useNavigate();
        
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    
    const createUser= async () =>{
        if( name ==='' || email === '' || password === ''){
            setErrorMsg("Fill all the Fields.");
            return;
        }
        await createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential) =>{
                //Signed IN
                const user = userCredential.user;
                // props.setUser(user);
                updateProfile(user,{
                    displayName: name
                });
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode === "auth/weak-password"){
                    setErrorMsg("Weak Password! must have more than 6 characters");
                }
                else if(errorCode === "auth/email-already-in-use"){
                    setErrorMsg("Email Already in Use by another Account!");
                }
                console.log(errorCode,errorMessage);    
            })
}

    return(
        <div className="font-san">
            <div className="w-auto m-auto flex flex-col items-center gap-5 p-5 ">
                <h1 className="font-medium text-2xl ">SignUp</h1>
                <InputControl lable={"Name"} placeholder={"Enter Name"} type={"text"} onChange={(event) => setName(event.target.value)} />
                <InputControl lable={"Email"} placeholder={"Enter Email"} type={"email"} onChange={(event) => setEmail(event.target.value)} />
                <InputControl lable={"Password"} placeholder={"Enter Password"} type={"password"} onChange={(event) => setPassword(event.target.value)} />
                <p className="text-red-600 font-semibold">{errorMsg}</p>
                <div className="">
                    <button onClick={createUser} className="w-64 p-1 bg-orange-400 rounded-md font-medium">SignUp</button>
                    <p className="py-2 text-center">
                        Already have an account?
                        <span className="authBtn ml-2"><Link to="/signin" className="text-orange-500">Login</Link></span>
                    </p>
                </div>
            </div>
        </div> 
    );
}

export default SignUp;