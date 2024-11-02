import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { signOut } from "firebase/auth";

const Navbar = () => {

    const navigate=useNavigate();

    const [user, loading] = useAuthState(auth);

    useEffect(()=>{
        if(user){
            navigate("/dashboard")
        }
    }, [user, loading])

    const logoutfunction =()=>{
        try{
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success("LoggedOut Successfully!")
                navigate("/")
              }).catch((error) => {
                // An error happened.
                toast.error(error.message)
              });
        }
        catch(e){
            toast.error(e.message)
        }
    }

    return ( 
        <div className="bg-black text-white h-[5vh] md:h-[8vh] flex justify-between items-center">
            <div className="flex items-center">
                <img src="https://t3.ftcdn.net/jpg/04/66/62/38/360_F_466623847_CSpdgE4LqMLn6y2IQ9IxDEN0a0rpuUgx.jpg" className="h-[5vh] md:h-[8vh] rounded-full" alt="" />
                <div className="font-semibold text-lg md:text-3xl ml-2">
                    PennyTrack
                </div>
            </div>
        {
            user &&
            <button onClick={logoutfunction} className="opacity-70 hover:opacity-100 md:text-xl mr-2">
                LogOut
            </button>
        }
        </div>
     );
}
 
export default Navbar;