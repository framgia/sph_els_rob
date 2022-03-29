import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import Header from "./Header";
import { profile } from "../actions";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Paper } from "@mui/material";
import UserList from "./UserList";
import CircularProgress from "@mui/material/CircularProgress";

const Profile = ({ user, profile }) => {
  let { id } = useParams();
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(true);
  const [cookies, setCookie] = useCookies(["user"]);
  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
    profile(id, cookies.token);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setValue("1");
  }, [id]);

  return (
    <div>
      <Header title={"Profile"} />
      {user !== null ? (
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
            <Box
              sx={{
                height: "10%",
                width: "100%",
                margin: "auto",
              }}
            >
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  margin: "auto",
                  transform: "translate(0, -10px)",
                  bgcolor: "#BB6464",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user.profile.avatar !== null
                      ? user.profile.avatar
                      : "https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg"
                  }
                  sx={{
                    width: "90%",
                    height: "90%",
                    margin: "auto",
                    transform: "translate(0, 0)",
                  }}
                />
              </Avatar>
            </Box>
            <Box
              sx={{
                height: "90%",
                width: "100%",
                margin: "auto",
                borderRadius: 5,
                border: 7,
                borderColor: "#BB6464",
              }}
            >
              <Box
                sx={{
                  height: "70%",
                  width: "100%",
                  mt: 12,
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    color: "#464E2E",
                    fontWeight: "bold",
                    fontSize: 20,
                    textTransform: "capitalize",
                  }}
                >
                  {user.profile.first_name} {user.profile.last_name}
                </Typography>
                <Grid
                  container
                  columns={12}
                  sx={{
                    maxWidth: "60%",
                    margin: "auto",
                    mt: 4,
                  }}
                >
                  <Grid align="center" item xs={6} sx={{ margin: "auto" }}>
                    <Typography
                      align="center"
                      sx={{
                        color: "#464E2E",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      0
                    </Typography>
                    <Typography
                      align="center"
                      sx={{
                        color: "#464E2E",
                        fontSize: 12,
                      }}
                    >
                      followers
                    </Typography>
                  </Grid>
                  <Grid align="center" item xs={6} sx={{ margin: "auto" }}>
                    <Typography
                      align="center"
                      sx={{
                        color: "#464E2E",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      0
                    </Typography>
                    <Typography
                      align="center"
                      sx={{
                        color: "#464E2E",
                        fontSize: 12,
                      }}
                    >
                      following
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  columns={12}
                  sx={{
                    maxWidth: "60%",
                    margin: "auto",
                  }}
                >
                  {user.profile.id === cookies.user.id ? (
                    ""
                  ) : (
                    <Grid align="center" item xs={12} sx={{ mt: 4 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => console.log("followed")}
                        sx={{
                          borderColor: "#BB6464",
                          width: "50%",
                          color: "#BB6464",
                          "&:hover": {
                            backgroundColor: "#BB6464",
                            borderColor: "#BB6464",
                            color: "white",
                          },
                        }}
                      >
                        FOLLOW
                      </Button>
                    </Grid>
                  )}

                  <Grid align="center" item xs={12} sx={{ mt: 4 }}>
                    <Link
                      variant="button"
                      href="/"
                      underline="none"
                      sx={{
                        margin: "auto",
                        "&:hover": {
                          color: "#BB6464",
                        },
                      }}
                    >
                      Learned {user.words_learned} words
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8} sx={{}}>
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
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { profile })(Profile);
