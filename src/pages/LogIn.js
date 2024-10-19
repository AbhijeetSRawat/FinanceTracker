import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { NavLink } from "react-router-dom"

const LogIn = () => {

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

    return ( 
        <div className="h-[95vh] w-[100vw] md:h-[92vh] text-white flex flex-col justify-center items-center">
        <div className="bg-slate-500 flex flex-col  w-[90vw] md:w-[30vw] rounded-lg p-4">
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
                <button className="h-[5vh] bg-black w-[81vw] md:w-[25vw] rounded-lg">Log In </button>
                <p className="font-semibold">or</p>
                <button className="h-[5vh] bg-black w-[81vw] md:w-[25vw] rounded-lg flex justify-center items-center mb-4">Log In with <FcGoogle className="mx-1" size="25px"/> Google</button>

                <div>Create a new account. <NavLink className="text-black font-semibold" to="/">Click here</NavLink></div>
            </div>

        </div>
    </div>
     );
}
 
export default LogIn;