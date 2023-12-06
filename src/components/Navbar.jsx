import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar= ()=>{
    const navigate = useNavigate();
    const [user,setUser]=useState();
    // const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          if(user){
            setUser(user);
            console.log(user);
          }
          else{
            setUser(null);
            navigate('/signin');
          }
        });
      },[])

    const signout =()=>{
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("sign-out success!");
            // props.setUser(null);
            navigate('/signin');
          }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
          });
    }

    return(
        <>
            <nav className="px-8 md:px-12 lg:px-20 py-4 border-b shadow-sm dark:shadow-white shadow-[red] flex items-center justify-between">
                <div className="text-2xl md:text-3xl font-thin">
                   tA-News
                </div>
                <div className="flex gap-4">
                    {  user ?
                        <>  
                            <p className="flex gap-1 items-center ">
                                <IoPersonCircleSharp size={32} />
                                {user.displayName}
                            </p>
                            <button className="py-1 px-4 border hover:bg-orange-400 hover:text-white  rounded-lg" onClick={signout} >
                                Sign Out   
                            </button>
                        </>
                        :
                        <>
                            <button className="py-1 px-4 border hover:bg-orange-400 hover:text-white  rounded-lg">
                                <Link to="/signin">
                                    Sign In    
                                </Link>
                            </button>
                            <button className="py-1 px-4 border hover:bg-orange-400 hover:text-white  rounded-lg">
                                <Link to="/signup">
                                    Sign Up    
                                </Link>
                            </button>
                        </>
                    }   
                </div>
            </nav>
        </>
    );

}

export default Navbar;