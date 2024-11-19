import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../Context/Context";
import "./Coin.css";
import LineChart from "../LineChart/LineChart";

function Coin() {
  // const API_KEY=import.meta.env.REACT_APP_API_KEY
  const { coinId } = useParams();
  const [coindata, setcoindata] = useState(null);
  const { currency } = useContext(CoinContext);
  const [historicaldata, setHistoricaldata] = useState(null);

  // Fetch coin chart data
  const FetchingHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        // "x-cg-demo-api-key": API_KEY,
      },
    };
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const data = await res.json();
      setHistoricaldata(data.prices || []);
      
    } catch (error) {
      console.log("Error fetching chart data:", error);
    }
  };

  // Fetch coin details
  const CoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        // "x-cg-demo-api-key": API_KEY,
      },
    };
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await res.json();
      setcoindata(data);
    } catch (error) {
      console.log("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    CoinData();
    FetchingHistoricalData();
  }, [currency, coinId]);

  if (coindata && historicaldata) {
    return (
      <div className="coin">
        <div className="coin_info">
          <img src={coindata.image?.large} alt={coindata.name} />
          <p>
            <b>
              {coindata?.name} ({coindata?.symbol?.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicaldata={historicaldata} />
        </div>
        <div className="coin-price">
          <ul>
            <li> Crypto Market Rank</li>
            <li>{coindata?.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Price</li>
              <li>
              {currency.symbol}
              {coindata.market_data.current_price[currency.name] !== undefined
                ? (coindata.market_data.current_price[currency.name] < 1
                    ? coindata.market_data.current_price[currency.name].toFixed(
                        6
                      )
                    : coindata.market_data.current_price[currency.name].toFixed(
                        0
                      )
                  ).toLocaleString()
                : "Price not available"}
            </li>
            </ul>
           <ul>
            <li>Market Cap</li>
            <li>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
           </ul>
           <ul>
            <li>24 High</li>
            <li>{currency.symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
           </ul>
           <ul>
            <li>24 Low</li>
            <li>{currency.symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
           </ul>
       
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
}

export default Coin;
