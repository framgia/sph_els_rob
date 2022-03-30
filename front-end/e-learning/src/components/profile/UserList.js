import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import Pagination from "@mui/material/Pagination";

import { listUser } from "../../actions";
import UserAvatar from "./UserAvatar";

import { Avatar, Box, Grid, Typography, Button, Paper } from "@mui/material";

const UserList = ({ listUser, users }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [minimum, setMinimum] = useState(0);
  const [cards_per_page, setCardsPerPage] = useState(10);
  const [maximum, setMaximum] = useState(cards_per_page);

  let navigate = useNavigate();

  const stringToColor = (name) => {
    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const handleChange = (event, value) => {
    if (value <= 1) {
      setMinimum(0);
      setMaximum(cards_per_page);
    } else {
      setMinimum(value * cards_per_page - cards_per_page);
      setMaximum(value * cards_per_page);
    }
  };

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
    listUser(cookies.token);
  }, []);

  return (
    <div>
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          height: 350,
          overflow: "auto",
          margin: "auto",
          p: "1%",
        }}
      >
        {users.slice(minimum, maximum).map((user) => {
          return (
            <Box
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
                  {user.avatar !== null ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://127.0.0.1:8000/public/Image/${user.avatar}`}
                    />
                  ) : (
                    <UserAvatar
                      first_name={user.first_name.toUpperCase()}
                      last_name={user.last_name.toUpperCase()}
                      size={45}
                    />
                  )}
                </Grid>
                <Grid item xs={8.5}>
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
                      <Typography
                        sx={{
                          color: "#05386b",
                          fontWeight: "bold",
                          fontSize: 16,
                          textTransform: "capitalize",
                        }}
                      >
                        {user.first_name} {user.last_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontSize: 14,
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2} align="center" sx={{ margin: "auto" }}>
                  <Button
                    color="primary"
                    onClick={() => navigate(`/profile/${user.id}`)}
                    sx={{
                      width: "50%",
                      color: "primary",
                      "&:hover": {
                        color: "#BB6464",
                      },
                    }}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Paper>
      <Pagination
        count={
          users.length % cards_per_page === 0
            ? users.length / cards_per_page
            : ((users.length / cards_per_page) >> 0) + 1
        }
        showFirstButton
        showLastButton
        onChange={handleChange}
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.users);
  return {
    users: Object.values(state.users),
  };
};

export default connect(mapStateToProps, { listUser })(UserList);
