const Navbar = () => {
    return ( 
        <div className="bg-black text-white h-[5vh] md:h-[8vh] flex justify-between items-center">
            <div className="flex items-center">
                <img src="https://t3.ftcdn.net/jpg/04/66/62/38/360_F_466623847_CSpdgE4LqMLn6y2IQ9IxDEN0a0rpuUgx.jpg" className="h-[5vh] md:h-[8vh] rounded-full" alt="" />
                <div className="font-semibold text-lg md:text-3xl ml-2">
                    PennyTrack
                </div>
            </div>
            <div className="opacity-70 hover:opacity-100 md:text-xl mr-2">
                LogOut
            </div>
        </div>
     );
}
 
export default Navbar;