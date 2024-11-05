import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { NavLink, useNavigate } from "react-router-dom"
import { auth, provider } from "../firebase";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import React from 'react';

const LogIn = () => {

    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [formData,setFormData] = useState({
        
        email:"",
        password:""
        
    })

    const changeHandler =(e)=>{
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [e.target.name]:e.target.value
            }
        })
    }

    function logInWithGoogle(){
        setLoading(true);

        try {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                setLoading(false);
                toast.success("Welcome Back to PennyTrack!");
                navigate("/dashboard")
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                setLoading(false);
                toast.error(errorCode+errorMessage);
                // ...
            });
        } catch (e) {
            setLoading(false);
            toast.error(e.message);
        }
    }

    const loginwithemailandpassword =()=>{
        if(formData.email !== "" && formData.password !== ""){
                setLoading(true);
                signInWithEmailAndPassword(auth, formData.email, formData.password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log(user);
                        toast.success("Welcome Back to PennyTrack!");
                        setLoading(false);
                        navigate("/dashboard");
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorCode + errorMessage);
                        setLoading(false);
                    });
        }
        else{
            toast.error("All the details are mandotary!")
        }
    }

    return ( 
        <div className="h-[95vh] w-[100vw] lg:h-[92vh] text-white flex flex-col justify-center items-center">
        <div className="bg-slate-500 flex flex-col  w-[90vw] lg:w-[30vw] rounded-lg p-4">
            <h1 className="font-bold text-2xl flex mb-6">
                Log In to <div className="text-black ml-1">PennyTrack</div>
            </h1>

            

            <label htmlFor="email" className="mb-1 text-lg">Email</label>
            <input type="email"
                    name="email"
                    placeholder="williamrogers@gmail.com"
                    className="text-black h-[6vh] rounded-md p-2 mb-4 border border-black border-b-2 shadow-lg"
                    
                    onChange={changeHandler}
                    value={formData.email}
                    id="email"
                     />

            <label htmlFor="password" className="mb-1 text-lg">Password</label>
            <input type="password"
                    name="password"
                    placeholder="Example123!"
                    className="text-black h-[6vh] rounded-md p-2 mb-4 border border-black border-b-2 shadow-lg"
                    onChange={changeHandler}
                    value={formData.password}
                    id="password"
                     /> 
                     
            


            <div className="flex flex-col items-center">
                <button disabled={loading} className={(loading)?("h-[5vh] bg-gray-800  w-[81vw] lg:w-[25vw] rounded-lg"):("h-[5vh] bg-black w-[81vw] lg:w-[25vw] rounded-lg")} onClick={loginwithemailandpassword}>Log In </button>
                <p className="font-semibold">or</p>
                <button onClick={logInWithGoogle} className={(loading)?("h-[5vh] bg-gray-800 w-[81vw] lg:w-[25vw] rounded-lg flex justify-center items-center mb-4"):("h-[5vh] bg-black w-[81vw] lg:w-[25vw] rounded-lg flex justify-center items-center mb-4")}>Log In with <FcGoogle className="mx-1" size="25px"/> Google</button>

                <div>Create a new account. <NavLink className="text-black font-semibold" to="/">Click here</NavLink></div>
            </div>

        </div>
    </div>
     );
}
 
export default LogIn;