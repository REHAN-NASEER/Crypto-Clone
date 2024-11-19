import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/Context";
import { Link } from "react-router-dom";
function Home() {
  const { currency, coins } = useContext(CoinContext);
  const [displaycoins, setdisplaycoins] = useState([]);
  const [input, setinput] = useState("");
  const query = (e) => {
    setinput(e.target.value);
  };
  useEffect(() => {
    if (input === "") {
      setdisplaycoins(coins);
    } else {
      const SearchedCoin = coins.filter((item) =>
        item.name.toLowerCase().includes(input.toLocaleLowerCase())
      );
      setdisplaycoins(SearchedCoin);
    }
  }, [input, coins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to world's Largest CryptoCurrency MarketPlace. Sign up to
          explore more about Crypto
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Seach coins..."
            value={input}
            onChange={query}
            list="coinlist"
          />
          <datalist id="coinlist">
            {Array.isArray(coins)
              ? coins.map((item, index) => (
                  <option key={index} value={item.name} />
                ))
              : "loading"}
          </datalist>
        </form>
      </div>
      <div className="crypto-table">
        <div className="crypto-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displaycoins.length === 0 ? (
          <p>No coins available</p> // Display message if no coins
        ) : (
          displaycoins.slice(0, 15).map((item, index) => (
            <Link to={`/coin/${item.id}`} key={index} className="crypto-layout">
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt={item.name} />{" "}
                {/* Add meaningful alt */}
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p
                style={{ textAlign: "center" }}
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100 + "%"}
              </p>
              <p className="market-cap">
                {currency.symbol}
                {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

// import React, { useContext, useEffect, useState } from "react";
// import "./Home.css";
// import { CoinContext } from "../../Context/Context";

// function Home() {
//   const { currency, coins } = useContext(CoinContext);
//   const [displaycoins, setdisplaycoins] = useState([]);
//   const [input, setinput] = useState("");

//   // Handle input change
//   const query = (e) => {
//     setinput(e.target.value); // Update input state
//   };

//   // Dynamically filter coins when input changes
//   useEffect(() => {
//     if (input === "") {
//       // If input is empty, show all coins
//       setdisplaycoins(coins);
//     } else {
//       // Filter coins based on input
//       const searchedCoins = coins.filter((item) =>
//         item.name.toLowerCase().includes(input.toLowerCase()) // Corrected typo
//       );
//       setdisplaycoins(searchedCoins);
//     }
//   }, [input, coins]); // Depend on both `input` and `coins`

//   return (
//     <div className="home">
//       <div className="hero">
//         <h1>
//           Largest <br />
//           Crypto Marketplace
//         </h1>
//         <p>
//           Welcome to the world's Largest CryptoCurrency MarketPlace. Sign up to
//           explore more about Crypto.
//         </p>
//         <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission/reload */}
//           <input
//             type="text"
//             placeholder="Search coins..."
//             value={input}
//             onChange={query} // Update input as user types
//           />
//           {/* Remove button since search is dynamic */}
//         </form>
//       </div>
//       <div className="crypto-table">
//         <div className="crypto-layout">
//           <p>#</p>
//           <p>Coins</p>
//           <p>Price</p>
//           <p style={{ textAlign: "center" }}>24H Change</p>
//           <p className="market-cap">Market Cap</p>
//         </div>
//         {displaycoins.length === 0 ? (
//           <p>No coins available</p> // Display message if no coins found
//         ) : (
//           displaycoins.slice(0, 15).map((item, index) => (
//             <div key={index} className="crypto-layout">
//               <p>{item.market_cap_rank}</p>
//               <div>
//                 <img src={item.image} alt={item.name} />
//                 <p>{item.name + " - " + item.symbol}</p>
//               </div>
//               <p>
//                 {currency.symbol} {item.current_price.toLocaleString()}
//               </p>
//               <p
//                 style={{ textAlign: "center" }}
//                 className={
//                   item.price_change_percentage_24h > 0 ? "green" : "red"
//                 }
//               >
//                 {Math.floor(item.price_change_percentage_24h * 100) / 100 + "%"}
//               </p>
//               <p className="market-cap">
//                 {currency.symbol}
//                 {item.market_cap.toLocaleString()}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;