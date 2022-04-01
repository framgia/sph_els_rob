import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import { Avatar, Box, Grid, Typography, Paper, Link } from "@mui/material";

import { activityList, allActivityList } from "../../actions";
import UserAvatar from "./UserAvatar";

const Activity = ({ activityList, activities, id, type, allActivityList }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
    if (type === "LIST_FOR_USER") activityList(id, cookies.token);
    else if (type === "LIST_FOR_ALL") allActivityList(cookies.token);
  }, []);

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }

    const timer = setTimeout(() => {
      if (type === "LIST_FOR_USER") activityList(id, cookies.token);
      else if (type === "LIST_FOR_ALL") allActivityList(cookies.token);
    }, 10000);

    return () => clearTimeout(timer);
  }, [activities]);

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        height: 380,
        overflow: "auto",
        margin: "auto",
        p: "1%",
      }}
    >
      {activities.length > 0 ? (
        activities.reverse().map((activity, index) => {
          return (
            <Box
              key={index}
              sx={{
                height: "70px",
                width: "100%",
                margin: "auto",
                mt: 1,
                border: 1,
                borderRadius: 4,
                borderColor: "#BB6464",
              }}
            >
              <Grid
                container
                columns={12}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Grid
                  item
                  xs={1.5}
                  align="center"
                  sx={{
                    margin: "auto",
                    p: 1,
                  }}
                >
                  {activity.avatar !== null ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://127.0.0.1:8000/public/Image/${activity.avatar}`}
                    />
                  ) : (
                    <UserAvatar
                      first_name={activity.user_name}
                      last_name={activity.last_name}
                      size={45}
                    />
                  )}
                </Grid>
                <Grid item xs={10.5}>
                  <Grid
                    container
                    columns={12}
                    sx={{
                      width: "100%",
                      height: "100%",
                      p: 1,
                    }}
                  >
                    <Grid item xs={12}>
                      {activity.type === "Follower" ? (
                        <Typography
                          sx={{
                            color: "#05386b",
                            fontWeight: "bold",
                            fontSize: 14,
                          }}
                        >
                          {activity.user_id === cookies.user.id ? (
                            <Link href={`/profile/${activity.user_id}`}>
                              You
                            </Link>
                          ) : (
                            <Link href={`/profile/${activity.user_id}`}>
                              {activity.user_name}
                            </Link>
                          )}{" "}
                          followed{" "}
                          <Link href={`/profile/${activity.user_following_id}`}>
                            {activity.following_name}
                          </Link>
                        </Typography>
                      ) : (
                        <div>
                          <Typography
                            sx={{
                              color: "#05386b",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            {activity.user_id === cookies.user.id ? (
                              <Link href={`/profile/${activity.user_id}`}>
                                You
                              </Link>
                            ) : (
                              <Link href={`/profile/${activity.user_id}`}>
                                {activity.user_name}
                              </Link>
                            )}{" "}
                            learned {activity.score} out of {activity.items}{" "}
                            words in{" "}
                            <Link href="/category">
                              {activity.category_title}
                            </Link>
                          </Typography>
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "GrayText",
                        }}
                      >
                        {activity.updated_at} ago
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          );
        })
      ) : (
        <Typography
          sx={{
            fontSize: 15,
            color: "red",
            textAlign: "center",
          }}
        >
          NO ACTIVITIES
        </Typography>
      )}
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: Object.values(state.activities),
  };
};

export default connect(mapStateToProps, { activityList, allActivityList })(
  Activity
);
