import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Box, Autocomplete } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import img from "../assets/backgroundImg.jpeg";
import _ from "lodash";
import Axios from "../api/api.config";
import { useNavigate } from "react-router";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import axios from "axios";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orgList, setOrgList] = useState([]);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
    organization_id: undefined,
  });
  const handleChange = (selectedValue: any, type: string, property: string) => {
    const obj: any = _.cloneDeep(login);
    if (type === "drop-down") {
      obj[property] = selectedValue?.id;
    } else {
      obj[property] = selectedValue.target.value;
    }
    setLogin(obj);
  };

  const getOrgList = async () => {
    try {
      const response = await Axios.get("/orgList");
      if (response.status === 200) {
        setOrgList(response?.data?.orgList);
      }
    } catch (err: any) {
      setErrorMessage("failed to fetch organization list");
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!orgList === false) {
      getOrgList();
    }
  }, []);

  const apiFun = async () => {
    try {
      const response = await Axios.post("/login", {
        data: login,
      });
      return response;
    } catch (err: any) {
      setOpen(true);
      setErrorMessage("error while login");
    }
  };
  const handleSubmit = async () => {
    // if (login.email && login.organization_id && login.password) {
    //   console.log(login);
    // }
    const response = await apiFun();
    if (response?.data !== undefined && response !== undefined) {
      const obj = {
        access_content: {
          accessToken: response?.data?.accessToken,
          tokenExpiresIn: response?.data?.access_token_expires_in,
        },
        user: response?.data?.user,
      };
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      window.localStorage.setItem("userData", JSON.stringify(obj));
      localStorage.setItem("refreshtoken", response?.data?.refreshToken);
      dispatch({ type: "getUserInfo", userid: obj?.user?.emp_id });
      navigate("/dashboard");
    }
    // if (response?.status == 403) {
    //   alert("wroking");
    //   setOpen(true);
    // }
  };

  return (
    <Box className="loginRoot">
      <Box className="innercontainer">
        <h1 className="heading">ProTask</h1>
        <Autocomplete
          // blurOnSelect={true}
          sx={{
            // display: "inline-block",
            width: "100%",
            "& input": {
              width: "100%",
              height: "40px",
              padding: 0,
              paddingLeft: "10px",
              boxSizing: "border-box",
              cursor: "pointer",
              borderRadius: "5px",
              // bgcolor: "background.paper",
              // color: (theme) =>
              //   theme.palette.getContrastText(theme.palette.background.paper),
            },
            "& .MuiAutocomplete-tag": {
              color: "red",
            },
          }}
          id="custom-input-demo"
          options={orgList}
          onChange={(_e, params) =>
            handleChange(params, "drop-down", "organization_id")
          }
          renderInput={(params) => (
            <div ref={params.InputProps.ref} style={{ position: "relative" }}>
              <input type="text" {...params.inputProps} />
              <ArrowDropDownIcon className="loginicon" />
            </div>
          )}
        />
        <input
          className="inputFields"
          onChange={(e) => handleChange(e, "input", "email")}
          placeholder="Email"
          type="email"
        />
        <input
          className="inputFields"
          onChange={(e) => handleChange(e, "input", "password")}
          placeholder="Password"
          type="password"
        />
        <p style={{ alignSelf: "flex-start" }}>
          new here ?{" "}
          <a
            href="/#/signin"
            style={{ color: "yellow", textDecoration: "none" }}
          >
            Register For Free
          </a>
        </p>
        <button className="loginbutton" onClick={handleSubmit}>
          Login
        </button>
      </Box>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button> */}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default Login;
