import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Header from "../Header";
import Create from "./Create";

const WordChoice = ({ auth }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  let { id } = useParams();
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
                Words for Category ID #{id}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Create token={cookies.token} user={cookies.user} id={id} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(WordChoice);
