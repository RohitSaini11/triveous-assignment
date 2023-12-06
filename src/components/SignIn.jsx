import { Link, useNavigate } from "react-router-dom";
import InputControl from "./InputControl";
import { useState } from "react";
import {auth} from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('');

    const checkUser = async () =>{
        if( email === '' || password === '' ){
            setErrorMsg("Fill all the Fields.");
            return;
        }
       await signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            //Logged In
            const user = userCredential.user;
            // props.setUser(user);
            navigate('/');
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === "auth/user-not-found"){
                setErrorMsg("User Not Found!");
            }
            else if(errorCode === "auth/wrong-password"){
                setErrorMsg("Incorrect Email / Password!");
            }
            else if(errorCode === "auth/too-many-requests"){
                setErrorMsg("Too many failed attempts! Account Temporarily Blocked , Please try again later.");
            }
            console.log(errorCode,errorMessage);
        })
    }

    return(
        <div className="font-san">
        <div className="w-auto m-auto flex flex-col items-center gap-5 p-5 ">
            <h1 className="font-medium text-2xl ">SignIn</h1>
            <InputControl lable={"Email"} placeholder={"Enter Email"} type={"email"} onChange={(event) => setEmail(event.target.value)} />
            <InputControl lable={"Password"} placeholder={"Enter Password"} type={"password"} onChange={(event) => setPassword(event.target.value)} />
            <p className="text-red-600 font-semibold">{errorMsg}</p>
            <div className="">
                <button onClick={checkUser} className="w-64 p-1 bg-orange-400 rounded-md font-medium">Sign In</button>
                <p className="py-2 text-center">
                    Don't have an account?
                    <span className="authBtn ml-2"><Link to="/signup" className="text-orange-500">Sign Up</Link></span>
                </p>
            </div>
        </div>
    </div> 
    )
}

export default SignIn;