import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  profile,
  followingList,
  followerList,
  follow,
  unfollow,
} from "../../actions";
import FollowingFollowerList from "./FollowingFollowerList";
import UserAvatar from "./UserAvatar";
import UpdateProfile from "./UpdateProfile";
import { Card } from "@mui/material";

const ProfileContent = ({
  user,
  profile,
  followers,
  followerList,
  followings,
  followingList,
  follow,
  unfollow,
  id,
  type,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [open_follow_button, setOpenFollowButton] = useState(true);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowings, setOpenFollowings] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openNotification, setOpenNotification] = useState("");

  const handleClose = () => {
    setOpenFollowers(false);
    setOpenFollowings(false);
    setOpenUpdate(false);
  };

  const handleOpenFollowers = () => {
    setOpenFollowers(true);
  };

  const handleOpenFollowings = () => {
    setOpenFollowings(true);
  };

  let navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleNotificationClose = () => {
    setOpenNotification(false);
  };

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
    followerList(id, cookies.token);
    followingList(id, cookies.token);
    profile(id, cookies.token);
  }, [id]);

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
    followerList(id, cookies.token);
    profile(id, cookies.token);
  }, [open_follow_button, followers.length]);

  useEffect(() => {
    profile(id, cookies.token);
    if (user !== null) {
      removeCookie("user", { path: "/" });
      setCookie("user", user.profile, { path: "/" });
    }
  }, [openUpdate]);

  return (
    <div>
      <Box
        sx={{
          height: 500,
        }}
      >
        <Box
          sx={{
            height: "10%",
            width: "100%",
            margin: "auto",
          }}
        >
          {user !== null ? (
            <Avatar
              sx={{
                width: 130,
                height: 130,
                margin: "auto",
                transform: "translate(0, -10px)",
                bgcolor: "#BB6464",
              }}
            >
              {user.profile.avatar !== null ? (
                <Avatar
                  alt="Remy Sharp"
                  src={`http://127.0.0.1:8000/public/Image/${user.profile.avatar}`}
                  sx={{ height: 118, width: 118 }}
                />
              ) : (
                <UserAvatar
                  first_name={user.profile.first_name.toUpperCase()}
                  last_name={user.profile.last_name.toUpperCase()}
                  size={118}
                />
              )}
            </Avatar>
          ) : (
            ""
          )}
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
          {user !== null ? (
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
              {type === "PROFILE" ? (
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
                    <Button
                      onClick={handleOpenFollowers}
                      sx={{
                        "&:hover": {
                          bgcolor: "white",
                        },
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{
                          color: "#464E2E",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {followers.length}
                      </Typography>
                    </Button>
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
                    <Button
                      onClick={handleOpenFollowings}
                      sx={{
                        "&:hover": {
                          bgcolor: "white",
                        },
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{
                          color: "#464E2E",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {followings.length}
                      </Typography>
                    </Button>
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
              ) : (
                ""
              )}
              <Grid
                container
                columns={12}
                sx={{
                  maxWidth: "60%",
                  margin: "auto",
                }}
              >
                {user.profile.id === cookies.user.id ? (
                  <Grid align="center" item xs={12} sx={{ mt: 4 }}>
                    {type === "PROFILE" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpenUpdate(true)}
                        sx={{
                          borderColor: "#BB6464",
                          maxWidth: "70%",
                          color: "#BB6464",
                          "&:hover": {
                            backgroundColor: "#BB6464",
                            borderColor: "#BB6464",
                            color: "white",
                          },
                        }}
                      >
                        EDIT PROFILE
                      </Button>
                    ) : (
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
                        Learned {user.lessons_learned}{" "}
                        {user.lessons_learned > 1 ? "lessons" : "lesson"}
                      </Link>
                    )}
                  </Grid>
                ) : (
                  <Grid align="center" item xs={12} sx={{ mt: 4 }}>
                    {user.is_following ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          unfollow(id, cookies.token);
                          setOpenFollowButton(false);
                        }}
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
                        UNFOLLOW
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          follow(id, cookies.token);
                          setOpenFollowButton(true);
                        }}
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
                    )}
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
                    Learned {user.words_learned}{" "}
                    {user.words_learned > 1 ? "words" : "word"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      {openNotification ? (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={openNotification}
          onClose={handleNotificationClose}
          autoHideDuration={3000}
        >
          <Alert
            onClose={handleNotificationClose}
            severity="success"
            sx={{ width: "100%", bgcolor: "#464E2E" }}
          >
            Successfully updated your profile!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      <Modal open={openFollowers} onClose={handleClose}>
        <FollowingFollowerList
          data={followers}
          onSetOpen={setOpenFollowers}
          title={"Followers"}
        />
      </Modal>
      <Modal open={openFollowings} onClose={handleClose}>
        <FollowingFollowerList
          data={followings}
          onSetOpen={setOpenFollowings}
          title={"Following"}
        />
      </Modal>
      <Modal open={openUpdate} onClose={handleClose}>
        <Card
          sx={{
            width: 600,
            maxHeight: "90%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            boxShadow: 12,
            p: 2,
          }}
        >
          <UpdateProfile
            onOpen={setOpenUpdate}
            onSetOpenNotification={setOpenNotification}
          />
        </Card>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    followers: Object.values(state.followers),
    followings: Object.values(state.followings),
  };
};

export default connect(mapStateToProps, {
  profile,
  followerList,
  followingList,
  follow,
  unfollow,
})(ProfileContent);
