import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";
import { useCookies } from "react-cookie";

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

const ListForUser = ({ userCategory, user_categories, addQuiz }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [start, setStart] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    userCategory(cookies.token);
  }, [start]);

  return (
    <Container maxWidth="96%">
      <Paper
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
            {user_categories.reverse().map((user_category, index) => {
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
                            {user_category.description.length >= 300
                              ? `${user_category.description.substring(
                                  0,
                                  300
                                )}...`
                              : user_category.description}
                          </Typography>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Button
                            onClick={() => {
                              addQuiz(user_category.id);
                              setOpen(true);
                              setStart(user_category.id);
                            }}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#464E2E",
                                color: "white",
                              },
                            }}
                          >
                            {user_category.status === 1 ? "•Retake" : "Start"}
                          </Button>
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
