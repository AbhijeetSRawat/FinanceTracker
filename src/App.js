import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {

  return (
   <div className="bg-slate-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<SignUp  />}/>
          <Route path="/login" element={<LogIn  />}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
   </div>
  );
}

export default App;
