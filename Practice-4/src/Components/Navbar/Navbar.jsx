import React from "react";
import logo from "../../assets/logo.png"
import arrow_icon from "../../assets/arrow_icon.png"
import "./Navbar.css"
function Navbar() {
  return(

      <div className="nav">
        <img src={logo} alt="" className="logo"/>
        <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Blogs</li>
            <li>Pricing</li>
        </ul>
        <div className="nav-right">
            <select >
                <option value="USD">USD</option>
                <option value="Rs">Rs</option>
                <option value="EURO">EURO</option>
            </select>
            <button>Signin <img src={arrow_icon} alt="" /></button>
        </div>
      </div>
    )
}

export default Navbar;
