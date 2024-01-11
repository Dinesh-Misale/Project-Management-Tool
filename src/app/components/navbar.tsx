import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

const Navbar = ({ children, customStyle, title }: any) => {
  const theme = useTheme();
  const showNavbar = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  let path: any = useLocation();
  path = path.pathname?.split("/");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  let userName: any = useSelector(
    (state: any) => state?.userSlice?.user?.user_name
  );
  userName = userName?.split(" ");
  userName = userName?.[0]?.slice(0, 1) + userName?.[1]?.slice(0, 1);

  useEffect(() => {
    const activeElement = document.querySelector(".active");
    activeElement?.classList.remove("active");
    const element = document.getElementById(path[1]);
    element?.classList.add("active");
  }, [path]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleEvent = (event: string) => {
    switch (event) {
      case "logout":
        dispatch({ type: "logout" });
        break;

      case "profile":
        navigate("/profile");
        break;

      case "personal settings":
        navigate("/personal-settings");
        break;

      default:
        console.log("did not get any valid event");
        break;
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const Links = () => {
    return (
      <>
        <button id="dashboard" className="buttons">
          <span
            className="span"
            onClick={() => handleNavigation("/#/dashboard")}
          >
            Dashboardd
          </span>
        </button>
        <button id="projects" className="buttons">
          <span
            className="span"
            onClick={() => handleNavigation("/#/projects")}
          >
            Projects
          </span>
        </button>
        <button id="plan" className="buttons">
          <span className="span" onClick={() => handleNavigation("/#/plan")}>
            Plan
          </span>
        </button>
        <button id="teams" className="buttons">
          <span className="span" onClick={() => handleNavigation("/#/teams")}>
            Teams
          </span>
        </button>
        <button id="board" className="buttons">
          <span className="span" onClick={() => handleNavigation("/#/board")}>
            Board
          </span>
        </button>
        <button className="buttons">
          <span className="span">Create</span>
        </button>
      </>
    );
  };

  return (
    <div className="root">
      <nav className="navBar">
        <section className="navigationSection">
          {showNavbar && (
            <>
              <Button onClick={() => setOpenMenu(true)}>open</Button>
              <Drawer
                // anchor={anchor}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
              >
                <Box
                  role="presentation"
                  onClick={() => setOpenMenu(false)}
                  onKeyDown={() => setOpenMenu(false)}
                  sx={{
                    height: "100%",
                    background: "#1D2125",
                    width: "200px",
                  }}
                >
                  <Box
                    sx={{
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      fontSize: "100px",
                    }}
                  >
                    {Links()}
                  </Box>
                </Box>
              </Drawer>
            </>
          )}
          <img src="#" alt="logo" style={{ margin: "0 20px 0" }} />
          {!showNavbar && Links()}
        </section>
        <section className="settingSection">
          <SettingsIcon fontSize="small" />
          <Box>
            <IconButton
              onClick={handleClick}
              sx={{ ml: 2, size: "10px" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  fontSize: "12px",
                  color: "black",
                }}
              >
                {userName}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => handleEvent("profile")}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleEvent("personal settings")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Personal Settings
              </MenuItem>
              <MenuItem onClick={() => handleEvent("logout")}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </section>
      </nav>
      {title?.enabled && (
        <div>
          <h2 style={{ margin: "40px 0 0 40px", color: "white" }}>
            {title?.heading}
          </h2>
        </div>
      )}
      <Box
        className="body"
        sx={{ display: { sm: "block", md: customStyle.display } }}
      >
        {children}
      </Box>
    </div>
  );
};

export default Navbar;
