import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
import UserAvatar from "./UserAvatar";
import Input from "@mui/material/Input";

import { updateProf } from "../../actions";

const UpdateProfile = ({ onOpen, updateProf, onSetOpenNotification }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [firstname, setFirstname] = useState(cookies.user.first_name);
  const [lastname, setLastname] = useState(cookies.user.last_name);
  const [email, setEmail] = useState(cookies.user.email);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState(null);
  const [error_firstname, setErrorFirstname] = useState("");
  const [error_lastname, setErrorLastname] = useState("");
  const [error_email, setErrorEmail] = useState("");
  const [error_password, setErrorPassword] = useState("");
  const [error_confirm_password, setErrorConfirmPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  const validate = () => {
    var no_error = true;
    if (firstname === "") {
      setErrorFirstname("First name is required!");
      no_error = false;
    } else setErrorFirstname("");
    if (lastname === "") {
      setErrorLastname("Last name is required!");
      no_error = false;
    } else setErrorLastname("");
    if (email === "") {
      setErrorEmail("Email is required!");
      no_error = false;
    } else if (
      !/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i.test(email)
    ) {
      setErrorEmail("Invalid email!");
      no_error = false;
    } else setErrorEmail("");
    if (password !== confirm_password) {
      setErrorConfirmPassword("Confirm password does not match!");
      no_error = false;
    } else setErrorConfirmPassword("");
    return no_error;
  };

  const onUpdate = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("first_name", firstname);
    data.append("last_name", lastname);
    data.append("email", email);
    data.append("password", password);
    data.append("file", image);

    if (validate()) {
      updateProf(data, cookies.token);
      setTimeout(() => {
        onOpen(false);
        onSetOpenNotification(true);
      }, 500);
      setTimeout(() => {
        onSetOpenNotification(false);
      }, 3000);
    }
  };

  const handleUpload = (file) => {
    setImage(file[0]);
    setAvatar(file[0]);
  };

  return (
    <Box
      onSubmit={onUpdate}
      sx={{
        mt: 2,
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
        UPDATE PROFILE
      </Typography>
      <Box
        onSubmit={onUpdate}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Grid
          container
          spacing={1}
          columns={12}
          sx={{ margin: "auto", height: "100%", width: "100%" }}
        >
          <Grid
            item
            xs={5}
            sx={{
              margin: "auto",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {avatar !== null ? (
              <Avatar
                alt="Remy Sharp"
                src={
                  avatar === ""
                    ? `https://elearning-backend-rob.herokuapp.com/public/Image/${cookies.user.avatar}`
                    : URL.createObjectURL(avatar)
                }
                sx={{ height: 118, width: 118 }}
              />
            ) : (
              <UserAvatar
                first_name={cookies.user.first_name.toUpperCase()}
                last_name={cookies.user.last_name.toUpperCase()}
                size={118}
              />
            )}
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              mt: 2,
              p: 2,
            }}
          >
            <Box sx={{ width: "100%", position: "relative" }}>
              <Input
                type="file"
                onChange={(e) => handleUpload(e.target.files)}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "40px",
                  zIndex: 2,
                  opacity: 0,
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  bgcolor: "#BB6464",
                  width: "100%",
                  height: "100%",
                  top: "0px",
                  left: "0px",
                  zIndex: 1,
                  color: "white",
                  position: "absolute",
                  border: 0,
                }}
              >
                Upload
              </Button>
            </Box>
            {image !== null ? image.name : ""}
          </Grid>
        </Grid>
      </Box>
      <form>
        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Firstname"
              autoFocus
              error={error_firstname === "" ? false : true}
              helperText={error_firstname}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              name="lastName"
              label="Lastname"
              autoComplete="family-name"
              error={error_lastname === "" ? false : true}
              helperText={error_lastname}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              autoComplete="email"
              autoFocus
              error={error_email !== "" ? true : false}
              helperText={error_email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {!showPasswordField ? (
              <Button variant="text" onClick={() => setShowPasswordField(true)}>
                Change Password
              </Button>
            ) : (
              <Button
                variant="text"
                onClick={() => {
                  setShowPasswordField(false);
                  setPassword("");
                  setConfirmPassword("");
                  setErrorPassword("");
                  setErrorConfirmPassword("");
                }}
              >
                Close
              </Button>
            )}
          </Grid>
          {showPasswordField ? (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
          ) : (
            ""
          )}
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            color: "red",
          }}
        >
          {cookies.user !== undefined ? "" : "Email is not available!"}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            color: "red",
          }}
        >
          <Button
            onClick={onUpdate}
            type="submit"
            fullWidth
            variant="contained"
            margin="center"
            sx={{
              mt: 2,
              mb: 2,
              width: "70%",
              margin: "center",
              bgcolor: "#05386b",
              "&:hover": {
                backgroundColor: "#edf5e1",
                color: "black",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updateProf })(UpdateProfile);
