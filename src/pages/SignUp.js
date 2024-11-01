import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db, provider } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const SignUp = () => {

    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const changeHandler =(e)=>{
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [e.target.name]:e.target.value
            }
        })
    }

    async function createDoc(user){
        //document about the user

        if(!user){
            return;
        }
        setLoading(true);
        const userRef=doc(db,"users",user.uid);
        const userData=await getDoc(userRef);

        if(!userData.exists()){
            try{
                await setDoc(doc(db, "users", user.uid), {
                    name:user.displayName ? user.displayName: formData.fullName,
                    email:user.email,
                    photoURL:user.photoURL?user.photoURL:"",
                    createdAt:new Date(),
                });
                setLoading(false);
            }
            catch(e){
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            toast.error("Document already exist !");
            setLoading(false);
        }
        
    }

    function signUpWithGoogle(){
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
                createDoc(user);
                toast.success("Welcome to PennyTrack!");
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

    function SignUpWithEmail(){
        // authenticate the user
            
        if(formData.name !== "" && formData.email !== "" && formData.password !== "" && formData.confirmPassword !== ""){
            if(formData.password === formData.confirmPassword){
                setLoading(true);
                
                createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    toast.success("Welcome to PennyTrack!");
                    setLoading(false);
                    setFormData({
                        fullName:"",
                        email:"",
                        password:"",
                        confirmPassword:""
                    });
                    createDoc(user);
                    navigate("/dashboard");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorCode + errorMessage);
                    setLoading(false);
                });
            }
            else{
                toast.error("Passwords do not match")
            }
        }
        else{
            toast.error("All the details are mandotary!")
        }
    }

    return ( 
        <div className="h-[95vh] w-[100vw] lg:h-[92vh] text-white flex flex-col justify-center items-center">
            <div className="bg-slate-500 flex flex-col  w-[90vw] lg:w-[30vw] rounded-lg p-4">
                <h1 className="font-bold text-2xl flex mb-6">
                    Welcome to <div className="text-black ml-1 ">PennyTrack</div>
                </h1>

                <label htmlFor="fullName" className="mb-1 text-lg">Full Name</label>
                <input type="text"
                        name="fullName"
                        placeholder="William Rogers"
                        className="text-black h-[6vh] rounded-md p-2 mb-4 border border-black border-b-2 shadow-lg"
                        onChange={changeHandler}
                        value={formData.fullName}
                        id="fullName"
                         />

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
                         
                <label htmlFor="confirmPassword" className="mb-1 text-lg">Confirm Password</label>
                <input type="text"
                        name="confirmPassword"
                        placeholder="Example123!"
                        className="text-black h-[6vh] rounded-md p-2 mb-4 border border-black border-b-2 shadow-lg"
                        onChange={changeHandler}
                        value={formData.confirmPassword}
                        id="confirmPassword"
                         /> 


                <div className="flex flex-col items-center">
                    <button disabled={loading} className={(loading)?("h-[5vh] bg-gray-800  w-[81vw] lg:w-[25vw] rounded-lg"):("h-[5vh] bg-black w-[81vw] lg:w-[25vw] rounded-lg")}   onClick={SignUpWithEmail }>Sign Up</button>
                    <p className="font-semibold">or</p>
                    <button onClick={signUpWithGoogle} className={(loading)?("h-[5vh] bg-gray-800 w-[81vw] lg:w-[25vw] rounded-lg flex justify-center items-center mb-4"):("h-[5vh] bg-black w-[81vw] lg:w-[25vw] rounded-lg flex justify-center items-center mb-4")}>Sign Up with <FcGoogle className={(loading)?("opacity-50 mx-1"):("opacity-100 mx-1")} size="25px"/> Google</button>

                    <div>Already have an account. <NavLink className="text-black font-semibold" to="/Login">Click here</NavLink></div>
                </div>

            </div>
        </div>
     );
}
 
export default SignUp;