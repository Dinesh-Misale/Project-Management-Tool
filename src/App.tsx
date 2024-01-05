import "./App.css";
import { ThemeProvider, makeStyles } from "@mui/styles";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./app/page/login";
import Register from "./app/page/register";
import Dashboard from "./app/page/dashboard";
import Navbar from "./app/components/navbar";
import { useDispatch } from "react-redux";
import Project from "./app/page/Project";
import { Theme } from "@mui/material";
import { useEffect } from "react";
import NewPage from "./app/page/newPage";

const useStyles = makeStyles({
  root: {
    color: "red",
  },
});
function App() {
  const dispatch = useDispatch();
  const userData: any = localStorage?.getItem("userData");
  const formattedData = JSON.parse(userData);
  const access_content = formattedData?.access_content;
  const refreshToken = localStorage?.getItem("refreshtoken");
  if (access_content?.tokenExpiresIn) {
    setInterval(() => {
      dispatch({
        type: "newToken",
        payload: { ...formattedData, refreshToken },
      });
    }, access_content?.tokenExpiresIn - 120000);
  }
  const classes = useStyles();
  return (
    <div>
      <Router>
        {/* <h1>testin</h1> */}
        <Routes>
          <Route path="*" element={<h1>404</h1>} />
          <Route path="/" element={<h1>home page</h1>} />
          <Route path="#login" element={<Login />} />
          <Route path="/signin" element={<Register />} />
          <Route path="/new" element={<NewPage />} />
          <Route
            path="/dashboard"
            element={
              <Navbar
                customStyle={{
                  display: "flex",
                }}
                title={{ enabled: true, heading: "Default Dashboard" }}
              >
                {" "}
                <Dashboard />{" "}
              </Navbar>
            }
          />
          <Route
            path="/projects"
            element={
              <Navbar
                customStyle={{
                  display: "flex",
                }}
                title={{ enabled: true, heading: "Projects" }}
              >
                {/* <h1></h1> */}
              </Navbar>
            }
          />
          <Route
            path="/board"
            element={
              <Navbar
                customStyle={{
                  display: "flex",
                }}
                title={{ enabled: true, heading: "Board" }}
              >
                <Project />
              </Navbar>
            }
          />
          <Route
            path="/profile"
            element={
              <Navbar
                customStyle={{
                  display: "flex",
                }}
                title={{ enabled: true, heading: "Profile" }}
              >
                {/* <h1></h1> */}
              </Navbar>
            }
          />
          <Route
            path="/personal-settings"
            element={
              <Navbar
                customStyle={{
                  display: "flex",
                }}
                title={{ enabled: true, heading: "Personal Settings" }}
              >
                {/* <h1></h1> */}
              </Navbar>
            }
          />
          <Route path="/ticket" element={<h1>ticket page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
