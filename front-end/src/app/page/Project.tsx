import react, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TaskStateCard from "../components/taskStateCards";
import Summary from "../components/summary";

const useStyle = makeStyles({
  root: {
    width: "100%",
    margin: "20px 0 0 40px",
  },
  container: {
    height: "100%",
    overflowY: "auto",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  classes?: any;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, classes, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes?.container}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Project = () => {
  const classes = useStyle();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box className={classes.root}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Summary" {...a11yProps(0)} sx={{ color: "white" }} />
          <Tab label="Board" {...a11yProps(1)} sx={{ color: "white" }} />
          <Tab label="List" {...a11yProps(2)} sx={{ color: "white" }} />
          <Tab label="Calendar" {...a11yProps(2)} sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} classes={classes}>
        <Summary />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item four
      </CustomTabPanel>
    </Box>
  );
};

export default Project;
