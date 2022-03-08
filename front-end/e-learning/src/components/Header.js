import React from "react";
import { useCookies } from "react-cookie";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Header = ({ title }) => {
  const [cookies, setCookie] = useCookies(["user"]);

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
              href="/users"
              underline="none"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              Users
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/admin-category"
              underline="none"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              Categories
            </Link>
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
