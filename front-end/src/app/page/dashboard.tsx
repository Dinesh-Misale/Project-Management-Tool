import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

const obj = [
  {
    id: 1,
    assignee: "Test User",
    summary: "UI Create Dashboard page",
    priority: "critical",
    key: 112,
    time: "2 minutes ago",
    action: { from: "open", to: "close" },
  },
  {
    id: 2,
    assignee: "Test User",
    summary:
      "write test case for dashboard page using palywright testing framework",
    priority: "major",
    key: 113,
    time: "5 minutes ago",
    action: { from: "open", to: "close" },
  },
  {
    id: 3,
    assignee: "Test User",
    summary: "create login form",
    priority: "critical",
    key: 114,
    time: "5 minutes ago",
    action: { from: "open", to: "in-progress" },
  },
  {
    id: 21,
    assignee: "Test User",
    summary: "validate the data for login form",
    priority: "critical",
    key: 115,
    time: "5 minutes ago",
    action: { from: "in-progress", to: "verification" },
  },
  {
    id: 12,
    summary: "testing",
    assignee: "Test User",
    priority: "critical",
    key: 112,
    time: "5 minutes ago",
    action: { from: "verifition", to: "close" },
  },
  {
    id: 34,
    assignee: "Test User",
    summary:
      "write test case for dashboard page using palywright testing framework",
    priority: "major",
    key: 113,
    time: "5 minutes ago",
    action: { from: "verification", to: "close" },
  },
  {
    id: 9,
    assignee: "Test User",
    summary: "create login form",
    priority: "critical",
    key: 114,
    time: "5 minutes ago",
    action: { from: "verification", to: "close" },
  },
  {
    id: 23,
    assignee: "Test User",
    summary: "validate the data for login form",
    priority: "critical",
    key: 115,
    time: "5 minutes ago",
    action: { from: "verification", to: "close" },
  },
  {
    id: 23,
    assignee: "Test User",
    summary: "validate the data for login form",
    priority: "critical",
    key: 115,
    time: "5 minutes ago",
    action: { from: "verification", to: "close" },
  },
];

const useStyles = makeStyles({
  outerContainerStyle: {
    flex: 1,
    background: "#282A3A",
    height: "85%",
    // height: "90%",
    // maxHeight: "100%",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "lightgray",
    },
    "&::-webkit-scrollbar-track": {
      margin: "10px 0 10px",
    },
  },
  commonStyles: {
    borderTop: "4px solid #279EFF",
    background: "#282A3A",
    borderRadius: "5px",
    overflow: "hidden",
    boxShadow: "2px 2px  black",
  },
  cardStyle: {
    height: "250px",
    // maxHeight: "300px",
    // "&::-webkit-scrollbar": {
    //   width: "2px",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   background: "lightgray",
    // },
    // "&::-webkit-scrollbar-track": {
    //   margin: "10px 0 10px",
    // },
    marginBottom: "20px",
  },
  taskTable: {
    maxHeight: "300px",
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "lightgray",
    },
    "&::-webkit-scrollbar-track": {
      margin: "10px 0 10px",
    },
  },
  activityTable: {
    overflowY: "auto",
    height: "85%",
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "lightgray",
    },
    "&::-webkit-scrollbar-track": {
      margin: "10px 0 10px",
    },
  },
  activityContainer: {
    margin: "30px 10px 0 40px",
  },
  taskContainer: { margin: "30px 20px 0" },
  activityCards: {
    display: "flex",
    widht: "100%",
    minHeight: "100px",
    height: "auto",
    borderTop: "1px solid lightgrey",
  },
  initials: {
    flex: 0.3,
    // : "center",
    marginTop: "10px",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dashboardData = useSelector((state: any) => state?.dashboardSlice);
  // console.log(dashboardData);
  const img = false;
  // const initials = "DM";
  let userData: any = localStorage.getItem("userData");
  // const refreshToken = localStorage.getItem('refreshtoken');
  userData = JSON.parse(userData);
  useEffect(() => {
    dispatch({
      type: "get_task_list",
      payload: {
        emp_id: userData?.user?.emp_id,
        org_id: userData?.user?.org_id,
      },
    });
  }, [dispatch, userData?.user?.emp_id, userData?.user?.org_id]);
  return (
    <>
      <Box
        className={`${classes.activityContainer} ${classes.outerContainerStyle} ${classes.commonStyles}`}
      >
        <Box style={{ display: "flex", margin: "20px" }}>
          <h4 style={{ fontSize: "17px", margin: 0, flex: 1 }}>
            Activity Streams
          </h4>
          <Box style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <RefreshIcon
              sx={{
                cursor: "pointer",
                fontSize: "19px",
              }}
            />
          </Box>
        </Box>
        <Box className={classes.activityTable}>
          {obj.map((e, index) => {
            let initials: any = e?.assignee.split(" ");
            initials = initials.map((element: any) => element.slice(0, 1));
            initials = initials.join("");
            return (
              <Box className={classes.activityCards} key={index}>
                <Box className={classes.initials}>
                  <Box
                    style={{
                      display: "flex",
                      width: "50%",
                      height: "50%",
                      borderRadius: "50%",
                      background: "lightblue",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "25%",
                    }}
                  >
                    <span
                    // style={{
                    //   display: "inline-block",
                    // }}
                    >
                      {initials}
                    </span>
                  </Box>
                </Box>
                <Box
                  style={{
                    flex: 2,
                    // marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box style={{ color: "#279EFF" }}>{e?.summary}</Box>
                  <Box>{`${e?.action?.from} --> ${e?.action?.to}`}</Box>
                  <Box style={{ color: "lightgray", opacity: ".5" }}>
                    {e?.time}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        className={`${classes.taskContainer} ${classes.outerContainerStyle}`}
        sx={{ background: "transparent" }}
      >
        <Box className={`${classes.cardStyle} ${classes.commonStyles}`}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <h4 style={{ margin: "15px 0 0 20px", flex: 1, fontSize: "16px" }}>
              Assigned to Me
            </h4>
            <RefreshIcon
              sx={{
                margin: "15px 20px 10px 20px",
                float: "right",
                cursor: "pointer",
                fontSize: "19px",
              }}
            />
          </Box>
          <Box
            style={{
              background: "#272829",
              width: "95%",
              marginLeft: "2.5%",
            }}
          >
            <table>
              <thead
                style={{
                  display: "inline-block",
                  borderBottom: "1px solid #F1F6F9",
                  padding: "0 5px 0",
                  marginTop: "5px",
                }}
              >
                {/* <thead> */}
                <tr>
                  <td style={{ width: "10vh" }}>key</td>
                  <td style={{ width: "80vh" }}>Summary</td>
                  <td style={{ width: "10vh" }}>Priority</td>
                </tr>
                {/* </thead> */}
              </thead>
              <tbody
                style={{
                  display: "inline-block",
                  height: "18vh",
                  overflowY: "scroll",
                }}
                className={classes.taskTable}
              >
                {dashboardData?.taskLoadingState && (
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    Loading...
                  </span>
                )}
                {dashboardData?.tasks &&
                  dashboardData?.tasks?.map((e: any, index: number) => {
                    return (
                      <tr
                        style={{ cursor: "pointer", color: "#279EFF" }}
                        onClick={() => console.log(e.id)}
                        key={index}
                      >
                        <td style={{ width: "10vh", padding: "5px 0" }}>
                          {e.ticket_number}
                        </td>
                        <td style={{ width: "80vh", padding: "5px 0" }}>
                          {e.description}
                        </td>
                        <td style={{ width: "10vh", padding: "5px 0" }}>
                          {e.priority}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Box>
        </Box>
        <Box className={`${classes.cardStyle} ${classes.commonStyles}`}></Box>
      </Box>
    </>
  );
};

export default Dashboard;
