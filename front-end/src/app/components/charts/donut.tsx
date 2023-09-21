import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useDonutData } from "../../assets/helper.functions/customHooks";

const Donut = ({ data }: any) => {
  const options = useDonutData(data, "testing");
  return <HighchartsReact options={options} highcharts={Highcharts} />;
};

export default Donut;
