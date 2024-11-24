import React, { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const API_KEY=import.meta.env.VITE_API_KEY


const CoinContextProvider = (props) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchCoins = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': API_KEY },
    };

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const contextValue = { coins, setCurrency, currency };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
