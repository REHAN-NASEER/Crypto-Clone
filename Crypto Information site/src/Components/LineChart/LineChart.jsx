import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChart({ historicaldata }) {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (historicaldata && Array.isArray(historicaldata)) {
      const FormattedData = [["Date", "Price"]];
      historicaldata.forEach((item) => {
        FormattedData.push([new Date(item[0]).toLocaleDateString().slice(0,-5), item[1]]);
      });
      setData(FormattedData);
    }
  }, [historicaldata]);

  if (!historicaldata || historicaldata.lenght === 0) {
    return <div>Loading.......</div>;
  }
  return (
    <Chart chartType="LineChart" data={data} height="100%" legendToggle></Chart>
  );
}
export default LineChart;
