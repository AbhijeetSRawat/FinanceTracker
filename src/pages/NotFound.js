const NotFound = () => {
    return ( 
        <div className="bg-slate-300 h-[95vh] flex justify-center items-center">
            <div className="bg-slate-500 text-white w-[80vw] md:w-[50vw] h-[40vh] flex flex-col gap-4 justify-center items-center rounded-lg shadow-2xl">
                <div className="text-3xl font-bold">
                    ERROR
                </div>
                <div className="text-black text-xl font-semibold">
                    404
                </div>
                <div className="text-3xl font-bold">
                    Page Not Found
                </div>
            </div>
        </div>
     );
}
 
export default NotFound;