import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Header";
import UserList from "./UserList";
import Activity from "./Activity";
import ProfileContent from "./ProfileContent";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

const Profile = ({ type }) => {
  let { id } = useParams();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header
        title={type === "PROFILE" ? "Profile" : "Home"}
        active={type === "PROFILE" ? "profile" : "dashboard"}
      />
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
          <ProfileContent id={id} type={type} />
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
              <TabPanel value="1">
                {type === "PROFILE" ? (
                  <Activity id={id} type={"LIST_FOR_USER"} />
                ) : (
                  <Activity id={id} type={"LIST_FOR_ALL"} />
                )}
              </TabPanel>
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
    </div>
  );
};

export default Profile;
