import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Header from "../Header";
import Create from "./Create";
import List from "./List";
import { bgcolor } from "@mui/system";
import ListForUser from "./ListForUser";

const Category = ({ auth }) => {
  const [cookies, setCookie] = useCookies(["user"]);

  let navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
  }, [auth]);

  return (
    <div>
      <Header title="Admin" />
      <Container maxWidth="xl">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4" color="inherit">
                Categories
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {cookies.role === "admin" ? (
                <Create token={cookies.token} user={cookies.user} />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      {cookies.role === "admin" ? (
        <List token={cookies.token} user={cookies.user} />
      ) : (
        <ListForUser token={cookies.token} user={cookies.user} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Category);
