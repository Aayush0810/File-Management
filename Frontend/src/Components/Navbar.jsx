import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const[loggedin, setLoggedin] = useState(false)
  const navigate = useNavigate(); 

  const token = localStorage.getItem("token");
  useEffect(() => {
    if(token) {
      setLoggedin(true); 
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedin(false); 
    navigate('/signin'); 
  };  

  return (
    <div className="bg-black text-white p-3">
      <div className="flex justify-around align-middle">
          <Link to={"/dashboard"} className="text-3xl font-semibold">File Manager</Link>
          {loggedin ? (
            <button onClick={logout} className="text-xl">Logout</button>
          ) : (
            ""
          )}
      </div>
    </div>
  );
};

export default Navbar;
