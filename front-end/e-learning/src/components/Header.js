import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const roles = ["admin", "member"];

const Header = ({ title }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [anchorCategory, setAnchorCategory] = React.useState(null);

  let navigate = useNavigate();

  const handleOpenCategoryMenu = (event) => {
    setAnchorCategory(event.currentTarget);
  };

  const handleCloseCategoryMenu = (role) => {
    setAnchorCategory(null);
    setCookie("role", role, { path: "/" });
    if (role === "admin") {
      navigate("/admin-category");
    } else navigate("/category");
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ bgcolor: "#05386b", color: "white" }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          E-Learning | {title}
        </Typography>
        {cookies.token === undefined ? (
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/signup"
              underline="none"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              Sign Up
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              underline="none"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              Log In
            </Link>
          </nav>
        ) : (
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/admin-users"
              underline="none"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              Users
            </Link>
            {cookies.user.role === "admin" ? (
              <Link
                component="button"
                variant="button"
                color="text.primary"
                underline="none"
                onClick={handleOpenCategoryMenu}
                sx={{ my: 1, mx: 1.5, color: "white" }}
              >
                Category
              </Link>
            ) : (
              <Link
                variant="button"
                color="text.primary"
                href="/admin-category"
                underline="none"
                sx={{ my: 1, mx: 1.5, color: "white" }}
              >
                Category
              </Link>
            )}
            <Menu
              sx={{ mt: "30px" }}
              id="menu-appbar"
              anchorEl={anchorCategory}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorCategory)}
              onClose={handleCloseCategoryMenu}
            >
              {roles.map((role) => (
                <MenuItem
                  key={role}
                  onClick={() => handleCloseCategoryMenu(role)}
                >
                  <Typography textAlign="center">{role}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              underline="none"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              Logout
            </Link>
          </nav>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
