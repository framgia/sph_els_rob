import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import Header from "../Header";
import UserList from "./UserList";
import ProfileContent from "./ProfileContent";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Profile = () => {
  let { id } = useParams();
  const [value, setValue] = useState("1");
  const [cookies, setCookie] = useCookies(["user"]);
  const [open, setOpen] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Header title={"Profile"} />
      {!open ? (
        <Grid
          container
          columns={12}
          sx={{
            maxWidth: 900,
            height: 500,
            margin: "auto",
            mt: 10,
          }}
        >
          <Grid item xs={4}>
            <ProfileContent cookies={cookies} id={id} />
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                margin: "auto",
                borderRadius: 5,
                border: 7,
                ml: 1,
                borderColor: "#BB6464",
              }}
            >
              <TabContext value={value}>
                <Box>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Activities" value="1" />
                    <Tab label="Users" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">Activities</TabPanel>
                <TabPanel value="2">
                  <Box
                    sx={{
                      width: "100%",
                      height: 390,
                      margin: "auto",
                      p: "1%",
                    }}
                  >
                    <UserList />
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "10%",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography
            gutterBottom
            sx={{
              color: "#05386b",
              mb: "20px",
              fontSize: 18,
              mt: 2,
            }}
          >
            Loading...
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Profile;
