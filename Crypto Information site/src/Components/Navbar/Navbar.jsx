import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import "./Navbar.css";
import { CoinContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate=useNavigate()
  const { setCurrency } = useContext(CoinContext);

  const currency_handler = (e) => {
    const value = e.target.value;
    const currencyData = {
      usd: { name: "usd", symbol: "$" },
      eur: { name: "eur", symbol: "€" },
      inr: { name: "inr", symbol: "₹" },
      pkr: { name: "pkr", symbol: "₨" }, 
    };

    setCurrency(currencyData[value] || currencyData["usd"]);
  };

  return (
    <div className="nav">
      <img src={logo} alt="" className="logo"  onClick={()=>navigate("/")}/>
      <ul>
        <li onClick={()=>navigate("/")}>Home</li>
        <li>Features</li>
        <li>Blogs</li>
        <li>Pricing</li>
      </ul>
      <div className="nav-right">
        <select onChange={currency_handler}>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
          <option value="inr">INR</option>
          <option value="pkr">PKR</option>
        </select>
        <button>
          Signin <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
