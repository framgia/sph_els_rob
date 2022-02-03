/** @format */

import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      sx={{ bgcolor: "#05386b", color: "white" }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          E-Learning
        </Typography>
        <nav>
          <Link
            variant='button'
            color='text.primary'
            href='#'
            underline='none'
            sx={{ my: 1, mx: 1.5, color: "white" }}
          >
            Sign Up
          </Link>
          <Link
            variant='button'
            color='text.primary'
            href='#'
            underline='none'
            sx={{ my: 1, mx: 1.5, color: "white" }}
          >
            Log In
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
