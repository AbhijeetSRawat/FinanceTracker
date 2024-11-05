import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Loader from "./components/Loader/Loader";
import React from 'react';

function App() {
  const navigate=useNavigate();

    const [user, loading] = useAuthState(auth);

    useEffect(()=>{
        if(user){
            navigate("/dashboard")
        }
    }, [user, loading])

  return (
   <div className="bg-slate-300 relative mb-3">
       {
        loading?(
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <Loader />
          </div>
        ):
        (
          <>
             <Navbar user={user} loading={loading}/>
              <Routes>
                <Route path="/" element={<SignUp  />}/>
                <Route path="/login" element={<LogIn  />}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
          </>
        )
       }
   </div>
  );
}

export default App;
