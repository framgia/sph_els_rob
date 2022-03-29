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

import {
  profile,
  followingList,
  followerList,
  follow,
  unfollow,
} from "../../actions";
import FollowingFollowerList from "./FollowingFollowerList";
import UserAvatar from "./UserAvatar";

const ProfileContent = ({
  user,
  profile,
  followers,
  followerList,
  followings,
  followingList,
  follow,
  unfollow,
  cookies,
  id,
}) => {
  const [open_follow_button, setOpenFollowButton] = useState(true);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowings, setOpenFollowings] = useState(false);

  const handleClose = () => {
    setOpenFollowers(false);
    setOpenFollowings(false);
  };

  const handleOpenFollowers = () => {
    setOpenFollowers(true);
  };

  const handleOpenFollowings = () => {
    setOpenFollowings(true);
  };

  let navigate = useNavigate();

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

  return (
    <div>
      {user !== null ? (
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
                  src="https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg"
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
                    Learned {user.words_learned} words
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.user);
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
