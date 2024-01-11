import src1 from "../assets/register.image.png";
import src2 from "../assets/register.image(2).png";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import Axios from "../api/api.config";
import { useNavigate } from "react-router";

const Register = () => {
  const [registerObj, setRegisterObj] = useState({
    orgName: "",
    orgEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setRegisterObj({
      ...registerObj,
      [e.target.id]: e.target.value,
    });
  };

  const submit = async () => {
    // console.log(registerObj);
    alert("called");
    if (registerObj.orgEmail && registerObj.orgEmail && registerObj.password) {
      // setLoading(true);

      try {
        const response = await Axios.post("/register", {
          data: registerObj,
        });
        if (
          response.status === 200 &&
          response?.data?.accessContext?.accessToken &&
          response?.data?.accessContext?.refreshToken
        ) {
          setRegisterObj({ orgName: "", orgEmail: "", password: "" });
          let obj = {
            accessContent: {
              accessToken: response?.data?.accessContext?.accessToken,
              refreshToken: response?.data?.accessContext?.refreshToken,
            },
          };
          localStorage.setItem("userData", JSON.stringify(obj));
          // localStorage.setItem(
          //   "accesstoken",
          //   response?.data?.accessContext?.accessToken
          // );
          // localStorage.setItem(
          //   "refreshtoken",
          //   response?.data?.accessContext?.refreshToken
          // );
          navigate("/dashboard");
          // setLoading(false);
        }
      } catch (err) {
        console.log("error while registering user");
        alert(err);
      }
    } else {
      alert("fill the form ");
    }
    // console.log();
  };
  return (
    <div className="registerRoot">
      <div className="registerContainer imageContainer">
        <h1
          style={{
            // color: "white",
            position: "absolute",
            left: "5%",
            fontSize: "40px",
          }}
        >
          pro<span style={{ color: "#337CCF" }}>task</span>
        </h1>
        <div style={{ marginTop: "100px" }}>
          <img className="image" src={src1} alt="img" />
          <img className="image" src={src2} alt="img" />
        </div>
        <p
          style={{
            fontSize: "20px",
            fontWeight: 600,
            marginTop: "50px",
            width: "80%",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Introducing our project management application – your ultimate
          solution for seamless project coordination. With task tracking at its
          core, it empowers you to assign, monitor, and meet deadlines
          effortlessly. But that's not all, Register to know more.
        </p>
      </div>
      <div className="registerContainer">
        <div className="formContainer">
          <p>START FOR FREE</p>
          <h1 style={{ margin: "10px 0" }}>
            Sign up to pro<span style={{ color: "#337CCF" }}>task</span>
          </h1>
          <span>
            already a member ? <a href="/login">login</a>{" "}
          </span>
          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <TextField
              id="orgName"
              label="Organization name"
              variant="outlined"
              value={registerObj.orgName}
              // fullWidth
              sx={{ width: "80%", marginBottom: "20px" }}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="orgEmail"
              label="Organization Email"
              variant="outlined"
              value={registerObj.orgEmail}
              sx={{ width: "80%", marginBottom: "20px" }}
              onChange={(e) => handleChange(e)}
              // fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={registerObj.password}
              sx={{ width: "80%", marginBottom: "20px" }}
              onChange={(e) => handleChange(e)}
              // fullWidth
            />
            <Button
              variant="contained"
              sx={{ width: "80%", height: "50px", fill: "blue" }}
              onClick={submit}
            >
              Create Account
            </Button>
          </Box>
        </div>
      </div>
      {loading && (
        <div className="loadingState">
          <CircularProgress
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
            color="secondary"
          />
        </div>
      )}
    </div>
  );
};

export default Register;
