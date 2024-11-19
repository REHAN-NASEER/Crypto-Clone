import React from "react";
import "./index.css"
import Navbar from "./Components/Navbar/Navbar";
import { Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Coin from "./Components/Coin/Coin";
import Footer from "./Components/footer/Footer";
function App() {
  return <div className="app">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/coin/:coinId" element={<Coin/>}/>
    </Routes>
    <Footer/>
  </div>;
}

export default App;
