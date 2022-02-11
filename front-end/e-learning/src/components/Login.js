import React, { useState } from "react";
import { connect } from "react-redux";

import Header from "./Header";
import { logIn } from "../actions";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Login = ({ logIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = e => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    logIn(data);
  };

  return (
    <div>
      <Header />
      <Container maxWidth='xs'>
        <Box
          onSubmit={onLogin}
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <form>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              onClick={onLogin}
              type='submit'
              fullWidth
              variant='contained'
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
              LOG IN
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logIn })(Login);
