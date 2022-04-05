import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { userCategory, addQuiz } from "../../actions";
import Question from "../quizzes/Question";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LinearProgress from "@mui/material/LinearProgress";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ListForUser = ({ userCategory, user_categories, addQuiz }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [start, setStart] = useState(null);
  const [open, setOpen] = useState(false);
  const [search_term, setSearchTerm] = useState("");
  const [status, setStatus] = React.useState(-1);

  let navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const StyledVisibleIcon = styled(VisibilityRoundedIcon)(({ theme }) => ({
    color: "#464E2E",
  }));

  useEffect(() => {
    userCategory(cookies.token);
  }, [start]);

  return (
    <Container maxWidth="96%">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="inherit">
              Categories
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Grid item xs={10.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
                height: "80%",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search user"
                value={search_term}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={1.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                sx={{ height: "80%", p: "2px 4px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={-1}>All</MenuItem>
                <MenuItem value={0}>Available</MenuItem>
                <MenuItem value={1}>Learned</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          overflow: "auto",
          margin: "auto",
          p: "1%",
          border: 0,
        }}
      >
        <Box marginTop="10px" sx={{ maxHeight: 600 }}>
          <Grid container spacing={2}>
            {user_categories
              .reverse()
              .filter((user_category) => {
                if (!search_term) {
                  if (status === -1) return user_category;
                  else if (status === user_category.status)
                    return user_category;
                } else if (
                  user_category.title
                    .toLowerCase()
                    .includes(search_term.toLowerCase())
                ) {
                  if (status === -1) return user_category;
                  else if (status === user_category.status)
                    return user_category;
                }
              })
              .map((user_category, index) => {
                if (!isNull(user_category))
                  if (user_category !== undefined)
                    return (
                      <Grid item key={index} xs={12} sm={6} md={3}>
                        <Card
                          sx={{
                            p: "10px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            "&:hover": {
                              backgroundColor: "#edf5e1",
                              color: "black",
                            },
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              sx={{
                                color: "#464E2E",
                                fontWeight: "bold",
                                mb: "20px",
                              }}
                            >
                              {user_category.title}
                            </Typography>
                            {user_category.status === 1 ? (
                              <Box sx={{ width: "100%", mt: 1, mb: 3 }}>
                                <Grid
                                  container
                                  spacing={0}
                                  sx={{ width: "100%", margin: "auto" }}
                                >
                                  <Grid item xs={10.5} sx={{ margin: "auto" }}>
                                    <LinearProgress
                                      variant="determinate"
                                      color={
                                        (user_category.words_learned /
                                          user_category.words_count) *
                                          100 >=
                                        75
                                          ? "success"
                                          : "primary"
                                      }
                                      value={
                                        (user_category.words_learned /
                                          user_category.words_count) *
                                        100
                                      }
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={1.5}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <Typography
                                      gutterBottom
                                      sx={{
                                        color: "#464E2E",
                                        fontWeight: "bold",
                                        mb: "20px",
                                        fontSize: 11,
                                      }}
                                    >
                                      {user_category.words_learned}/
                                      {user_category.words_count}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            ) : (
                              ""
                            )}
                            <Typography
                              align="justify"
                              variant="body2"
                              style={{
                                display: "inline-block",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {user_category.description.length >= 300 ? (
                                <div>
                                  {user_category.description.substring(0, 300)}
                                  ...
                                  <Tooltip
                                    title={
                                      <Typography
                                        paragraph={false}
                                        align="justify"
                                        style={{
                                          display: "inline-block",
                                          whiteSpace: "pre-line",
                                          fontSize: 11,
                                        }}
                                      >
                                        {user_category.description}
                                      </Typography>
                                    }
                                    placement="top"
                                    will-change="transform"
                                  >
                                    <IconButton>
                                      <StyledVisibleIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              ) : (
                                user_category.description
                              )}
                            </Typography>
                          </CardContent>
                          <CardActions
                            disableSpacing
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            {user_category.status !== 1 ? (
                              <Button
                                onClick={() => {
                                  addQuiz(user_category.id);
                                  setOpen(true);
                                  setStart(user_category.id);
                                  setCookie("category", user_category, {
                                    path: "/",
                                  });
                                }}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#464E2E",
                                    color: "white",
                                  },
                                }}
                              >
                                Start
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  setCookie("category", user_category, {
                                    path: "/",
                                  });
                                  navigate(`/result/${user_category.id}`);
                                }}
                                sx={{
                                  color: "green",
                                  "&:hover": {
                                    backgroundColor: "#464E2E",
                                    color: "white",
                                  },
                                }}
                              >
                                Result
                              </Button>
                            )}

                            {user_category.id === start ? (
                              <Modal
                                open={open}
                                BackdropProps={{
                                  style: {
                                    backgroundColor: "black",
                                    opacity: 0.9,
                                  },
                                }}
                              >
                                <Question
                                  data={user_category}
                                  onSetState={setStart}
                                  onSetOpen={setOpen}
                                  isOpen={true}
                                  token={cookies.token}
                                />
                              </Modal>
                            ) : (
                              ""
                            )}
                          </CardActions>
                        </Card>
                      </Grid>
                    );
              })}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user_categories: Object.values(state.user_categories),
  };
};

export default connect(mapStateToProps, { userCategory, addQuiz })(ListForUser);
