import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import TaskStateCard from "./taskStateCards";
import Donut from "../charts/donut";
import StatusOverview from "./statusOverview";

const useStyles = makeStyles({
  root: {
    widht: "100%",
    height: "100%",
    // overflow: "hidden",
  },
});

const TempData = [
  {
    count: 0,
    type: "done",
  },
  {
    count: 4,
    type: "create",
  },
  {
    count: 4,
    type: "update",
  },
  {
    count: 0,
    type: "due-date",
  },
];

const statusOverview = [
  { id: 1, name: "Done", y: 3 },
  { id: 2, name: "In-progress", y: 2 },
  { id: 1, name: "Verification", y: 0 },
];

const Summary = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {TempData?.map((e: { count: number; type: string }) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TaskStateCard count={e?.count} type={e?.type} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* <StatusOverview data={statusOverview} /> */}
        </Grid>
        <Grid item xs={6}>
          {/* <Donut data={statusOverview} /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
