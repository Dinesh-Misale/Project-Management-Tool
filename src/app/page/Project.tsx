import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Summary from "../components/board/summary";
import Board from "../components/board/board";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  classes?: any;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, classes, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ height: "100%", overflowY: "auto" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Project = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onDragEnd = () => {
    console.log("done");
  };
  return (
    <Box
      sx={{
        marginLeft: { xs: 0, md: "2em" },
        width: "100%",
        margin: "20px 0 0 2em",
      }}
    >
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
      <CustomTabPanel value={value} index={0}>
        <Summary />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* <DragDropContext onDragEnd={onDragEnd}> */}
        <Board />
        {/* </DragDropContext> */}
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
