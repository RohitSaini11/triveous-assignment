import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Favourite from './components/Favourite';
import News from './components/News';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user,setUser]=useState();
  const navigate=useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log(user);
      }
      else{
        navigate('/signin');
      }
    });
  },[])


  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={ <Home /> } />
        
        <Route path='/signin' element={<SignIn />} />
        
        <Route path='/signup' element={<SignUp />}  />
        
        <Route path='/favourite' element={<Favourite />}  />
        
        <Route path='/news' element={<News />} />
      
      </Routes>
    </>
  )
}

export default App;