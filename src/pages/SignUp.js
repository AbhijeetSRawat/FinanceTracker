import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const SignUp = () => {

    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const changeHandler =(e)=>{
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [e.target.name]:e.target.value
            }
        })
    }

    return ( 
        <div className="h-[95vh] w-[100vw] md:h-[92vh] text-white flex flex-col justify-center items-center">
            <div className="bg-slate-500 flex flex-col  w-[90vw] md:w-[30vw] rounded-lg p-4">
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
                    <button className="h-[5vh] bg-black w-[81vw] md:w-[25vw] rounded-lg">Sign Up</button>
                    <p className="font-semibold">or</p>
                    <button className="h-[5vh] bg-black w-[81vw] md:w-[25vw] rounded-lg flex justify-center items-center mb-4">Sign Up with <FcGoogle className="mx-1" size="25px"/> Google</button>

                    <div>Already have an account. <NavLink className="text-black font-semibold" to="/Login">Click here</NavLink></div>
                </div>

            </div>
        </div>
     );
}
 
export default SignUp;