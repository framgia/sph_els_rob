import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  Pagination,
  Paper,
} from "@mui/material";
import UserAvatar from "./UserAvatar";

const FollowingFollowerList = ({ data, onSetOpen, title }) => {
  const [minimum, setMinimum] = useState(0);
  const [cards_per_page, setCardsPerPage] = useState(6);
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

  return (
    <Card
      sx={{
        width: 600,
        height: 500,
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
      <Box sx={{ height: "7%", margin: "auto", mt: 1 }}>
        <Typography
          sx={{
            color: "#05386b",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ height: "80%" }}>
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            margin: "auto",
            p: 3,
          }}
        >
          {data.length > 0 ? (
            data.slice(minimum, maximum).map((dt) => {
              return (
                <Box
                  sx={{
                    height: "60px",
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
                      {dt.avatar !== null ? (
                        <Avatar
                          alt="Remy Sharp"
                          src="https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg"
                        />
                      ) : (
                        <UserAvatar
                          first_name={dt.first_name.toUpperCase()}
                          last_name={dt.last_name.toUpperCase()}
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
                            {dt.first_name} {dt.last_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              fontSize: 14,
                            }}
                          >
                            {dt.email}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} align="center" sx={{ margin: "auto" }}>
                      <Button
                        color="primary"
                        onClick={() => {
                          onSetOpen(false);
                          navigate(`/profile/${dt.id}`);
                        }}
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
            })
          ) : (
            <Box
              sx={{
                margin: "auto",
                textAlign: "center",
                mt: 5,
              }}
            >
              <Typography
                sx={{
                  color: "#BB6464",
                  fontWeight: "bold",
                  fontSize: 20,
                  textTransform: "uppercase",
                }}
              >
                NO {title}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
      <Box sx={{ height: "12%" }}>
        <Pagination
          count={
            data.length % cards_per_page === 0
              ? data.length / cards_per_page
              : ((data.length / cards_per_page) >> 0) + 1
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
      </Box>
    </Card>
  );
};

export default FollowingFollowerList;
