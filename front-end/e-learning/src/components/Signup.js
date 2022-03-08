import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "./Header";
import { signUp } from "../actions";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Signup = ({ signUp, auth }) => {
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error_firstname, setErrorFirstname] = useState("");
  const [error_lastname, setErrorLastname] = useState("");
  const [error_email, setErrorEmail] = useState("");
  const [error_password, setErrorPassword] = useState("");
  const [error_confirm_password, setErrorConfirmPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  const validate = () => {
    var no_error = true;
    if (firstname === "") {
      setErrorFirstname("Field is required!");
      no_error = false;
    } else setErrorFirstname("");
    if (lastname === "") {
      setErrorLastname("Field is required!");
      no_error = false;
    } else setErrorLastname("");
    if (email === "") {
      setErrorEmail("Field is required!");
      no_error = false;
    } else if (
      !/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i.test(email)
    ) {
      setErrorEmail("Invalid email!");
      no_error = false;
    } else setErrorEmail("");
    if (password === "") {
      setErrorPassword("Field is required!");
      no_error = false;
    } else setErrorPassword("");
    if (password !== confirm_password) {
      setErrorConfirmPassword("Confirm password does not match!");
      no_error = false;
    } else if (confirm_password === "") {
      setErrorConfirmPassword("Field is required!");
      no_error = false;
    } else setErrorConfirmPassword("");
    return no_error;
  };

  const onSignup = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
    };
    if (validate()) {
      signUp(data);
    }
  };

  useEffect(() => {
    if (auth !== null) {
      if (auth.token !== undefined || auth.token !== null) {
        setCookie("user", auth.user, { path: "/" });
        setCookie("token", auth.token, { path: "/" });
        navigate("/admin-category");
      }
    }
    if (cookies.token !== undefined) {
      navigate("/admin-category");
    }
  }, [auth]);

  return (
    <div>
      <Header />
      <Container maxWidth="xs">
        <Box
          onSubmit={onSignup}
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 5,
            }}
          >
            Register
          </Typography>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={error_firstname === "" ? false : true}
                  helperText={error_firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={error_lastname === "" ? false : true}
                  helperText={error_lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={error_email === "" ? false : true}
                  helperText={error_email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  error={error_password === "" ? false : true}
                  helperText={error_password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="confirm-password"
                  error={error_confirm_password === "" ? false : true}
                  helperText={error_confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              onClick={onSignup}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                bgcolor: "#05386b",
                "&:hover": {
                  backgroundColor: "#edf5e1",
                  color: "black",
                },
              }}
            >
              SIGN UP
            </Button>
          </form>
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

export default connect(mapStateToProps, { signUp })(Signup);
