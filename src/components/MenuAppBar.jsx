import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";

export default function MenuAppBar({ user, setUser, setToken }) {
  const token = localStorage.getItem("token");
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }
  const accountMenuItems = user.username
    ? [
        <Link to={"/"} label="Home" key="home">
          Home
        </Link>,

        <Link to={"/posts"} label="Posts" key="posts">
          Posts
        </Link>,
        <Link to={`/new-post`} label="Create New Post" key="new-post">
          Create New Post
        </Link>,
      ]
    : [
        <Link to={"/"} label="Home" key="new-user-home">
          Home
        </Link>,
        <Link to={"/posts"} label="Posts" key="new-user-posts">
          Posts
        </Link>,
        <Link to={"/login"} label="Login" key="new-user-login">
          Login
        </Link>,
        <Link to={"/register"} label="Register" key="new-user-register">
          Register
        </Link>,
      ];
  const accountCircleMenuItems = user.username
    ? [
        <Link to={"/profile"} label="Profile" key="icon-profile">
          My Profile
        </Link>,

        <Link
          onClick={handleLogout}
          to={"/login"}
          label="Logout"
          key="icon-logout"
        >
          Logout
        </Link>,
      ]
    : [
        <Link to={"/login"} label="Login" key="new-user-icon-login">
          Login
        </Link>,
        <Link to={"/register"} label="Register" key="new-user-icon-register">
          Register
        </Link>,
      ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar key={user.username}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Strangers Things
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls={accountCircleMenuItems}
                aria-haspopup="true"
                // onClick={handleClose}
                color="inherit"
              >
                <MenuItem>
                  {/* <AccountCircle /> */}
                  {accountCircleMenuItems}
                </MenuItem>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}> {accountMenuItems}</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
