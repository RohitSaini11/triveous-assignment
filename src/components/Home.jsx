import { useEffect } from 'react';
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home=()=>{
    const navigate = useNavigate();
    

    return(
       <p>
         Home Page!
       </p>
    )
}

export default Home;