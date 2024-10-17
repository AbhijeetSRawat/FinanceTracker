const Navbar = () => {
    return ( 
        <div className="bg-black text-white h-[5vh] md:h-[8vh] flex justify-between items-center">
            <div className="flex items-center">
                <img src="https://files.oaiusercontent.com/file-8nOre2d0072NReAJmeG5c88z?se=2024-10-17T12%3A30%3A18Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7931df24-ce91-45a8-96e8-3db790fbc368.webp&sig=GTohrmvvYkUtxCFi5gOWATzIJdLttFHSOlfc2jIm4XQ%3D" className="h-[5vh] md:h-[8vh]" alt="" />
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