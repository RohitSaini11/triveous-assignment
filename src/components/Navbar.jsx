import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar= ()=>{
    const navigate = useNavigate()

    const signout =()=>{
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("sign-out success!");
            // props.setUser(null);
            navigate('/');
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
                    <button className="py-1 px-4 border hover:bg-orange-400 hover:text-white  rounded-lg" onClick={signout} >
                            Sign Out   
                    </button>
                </div>
            </nav>
        </>
    );

}

export default Navbar;