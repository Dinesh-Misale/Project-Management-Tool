import React from "react";
import { Box } from "@mui/material";
import Donut from "../charts/donut";
import CircleIcon from "@mui/icons-material/Circle";

type dataProps = {
  id: number;
  y: number;
  name: string;
};

interface statusOverviewProps {
  data: Array<dataProps>;
}

const StatusOverview = (props: statusOverviewProps) => {
  const customList = (element: any) => {
    return (
      <p style={{ margin: 0, padding: 0 }}>
        <CircleIcon fontSize="small" />
        <span>{element?.name}</span>
        <span>{element?.y}</span>
      </p>
    );
  };
  return (
    <Box className="statusOverContainer">
      <h3 style={{ margin: 0, paddingLeft: "20px" }}>Status Overview</h3>
      <Box className="container">
        <Box style={{ flex: 1, alignSelf: "center" }}>
          <Donut data={props?.data} />
        </Box>
        <Box style={{ flex: 1, alignSelf: "center" }}>
          {props?.data?.map((e: any) => {
            return customList(e);
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default StatusOverview;
