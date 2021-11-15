import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import Spinner from './Spinner';

const OverallAvg = () => {
	const [overallSeriesAvg, setOverallSeriesAvg] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => { 
    async function fetchOverallAvg() {
      console.log('in use effect');
      const response = await axios.get(
        "https://time-series-backend.herokuapp.com/overallavg"
      );
      const avgSeries = [];
      const series = response.data.map((obj, index) => {
        let getDate= new Date(`${obj.year}-${obj.month}`);
        let month = getDate.toLocaleString("default", { month: "short" });
        console.log(month);
        let singleObj = {
          id: index + 1,
          year: obj.year,
          month: month,
          seriesAvg: obj.series_avg,
          date: `${month}/${obj.year}`
        };
        avgSeries.push(singleObj);
        return avgSeries;
      })
      console.log();
      setOverallSeriesAvg(avgSeries);
      setLoading(false);
    } 
    fetchOverallAvg();
	}, []);
	
	return (
    
  
    <>
      {console.log(overallSeriesAvg)}
      <h2>Interactive Property Series Average for 36 Months</h2>
      {loading ? <Spinner /> : (
        overallSeriesAvg.length > 0 && (
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart
              width={600}
              height={500}
              data={overallSeriesAvg}
              margin={{
                top: 40,
                right: 40,
                left: 20,
                bottom: 60
              }}
            >
              <CartesianGrid horizontal="true" vertical="" stroke="#243240" />
              <XAxis
                dataKey="date"
                name="month"
                tick={{ fill: "black" }}
                interval={0}
                angle={45}
                fontSize={12}
                dx={18}
                dy={18}
                label={{
                  value: "Date (mon/year)",
                  position: "insideBottomCenter",
                  dy: 50,
                  fontSize: 15,
                  fill: "#5751d1"
                }}
              />
              <YAxis
                interval={0}
                domain={["auto", "auto"]}
                tick={{ fill: "#2e4355" }}
                label={{
                  value: "Returns (Average)",
                  position: "insideLeft",
                  angle: -90,
                  dy: 60,
                  fontSize: 15,
                  fill: "#5751d1"
                }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
                itemStyle={{ color: "#fff" }}
                cursor={false}
                name="month"
              />
              <ReferenceLine
                x="Jan/2019"
                stroke="#8884d8"
                label={{
                  value: "2019",
                  position: "top",
                  fill: "#5751d1"
                }}
              />
              <ReferenceLine
                x="Jan/2020"
                stroke="#8884d8"
                label={{
                  value: "2020",
                  position: "top",
                  fill: "#5751d1"
                }}
              />
              <ReferenceLine
                x="Jan/2021"
                stroke="#8884d8"
                label={{
                  value: "2021",
                  position: "top",
                  fill: "#5751d1"
                }}
              />
              <Line
                type="monotone"
                name="Series Average"
                dataKey="seriesAvg"
                stroke="#2e4355"
                strokeWidth="1"
                dot={{
                  fill: "#2e4355",
                  stroke: "#2e4355",
                  strokeWidth: 1,
                  r: 2
                }}
                activeDot={{
                  fill: "#2e4355",
                  stroke: "#8884d8",
                  strokeWidth: 2,
                  r: 4
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ))}
    </>
  )
}

export default OverallAvg;