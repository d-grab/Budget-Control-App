import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BudgetChart = ({ data, options, type }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(chartCtx, {
      type: type,
      data: data,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options, type]);

  return <canvas id="myChart" ref={chartRef} />;
};

export default BudgetChart;
