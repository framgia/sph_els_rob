import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { listWord, saveAnswer, submitLesson } from "../../actions";

const Question = ({
  listWord,
  words_choices,
  saveAnswer,
  data,
  token,
  submitLesson,
}) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [count, setCount] = useState(0);

  let navigate = useNavigate();

  const StyledNextIcon = styled(ArrowForwardIosRoundedIcon)(({ theme }) => ({
    color: "#BB6464",
  }));

  const StyledPrevIcon = styled(ArrowBackIosRoundedIcon)(({ theme }) => ({
    color: "#BB6464",
  }));

  const onAnswer = (word_id, choice_id) => {
    if (answers[word_id] === undefined) {
      setCount(count + 1);
    }
    saveAnswer(data.id, word_id, choice_id, token);
    setAnswers({ ...answers, [word_id]: choice_id });
    if (words_choices.length != currentWord + 1) {
      setCurrentWord(currentWord + 1);
    }
  };

  useEffect(() => {
    if (token === undefined) {
      navigate("/");
    }
    listWord(token, data.id);
  }, []);

  useEffect(() => {}, [answers]);

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          p: 2,
          boxShadow: 12,
        }}
      >
        <CardContent>
          <span style={{ fontSize: "20px" }}>{`Word ${currentWord + 1}`}</span>/
          {words_choices.length}
          <Box sx={{ width: "100%", mt: 1, mb: 3 }}>
            <LinearProgress
              variant="determinate"
              color={
                (count / words_choices.length) * 100 >= 75
                  ? "success"
                  : "primary"
              }
              value={(count / words_choices.length) * 100}
            />
          </Box>
          <Grid container spacing={2} columns={12}>
            <Grid
              item
              xs={6}
              sx={{
                margin: "auto",
              }}
            >
              <Typography
                align="center"
                variant="h4"
                display="block"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  m: 1,
                  textTransform: "capitalize",
                  fontFamily: "Impact",
                  color: "#BB6464",
                }}
              >
                {words_choices.length !== 0
                  ? words_choices[currentWord].word.value
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {words_choices.length !== 0
                ? words_choices[currentWord].choices.map((choice) => (
                    <Grid spacing={2} key={choice.id}>
                      <Grid
                        item
                        sx={{
                          margin: "8px",
                        }}
                      >
                        <Button
                          variant={
                            answers[words_choices[currentWord].word.id] ===
                            choice.id
                              ? "contained"
                              : "outlined"
                          }
                          color={
                            answers[words_choices[currentWord].word.id] ===
                            choice.id
                              ? "success"
                              : "primary"
                          }
                          onClick={() =>
                            onAnswer(
                              words_choices[currentWord].word.id,
                              choice.id
                            )
                          }
                          sx={{
                            width: "100%",
                            "&:hover": {
                              backgroundColor: "#edf5e1",
                              color: "black",
                            },
                          }}
                        >
                          {choice.value}
                        </Button>
                      </Grid>
                    </Grid>
                  ))
                : ""}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container spacing={2} columns={12}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {currentWord > 0 ? (
                <Tooltip title="Previous" placement="top">
                  <IconButton onClick={() => setCurrentWord(currentWord - 1)}>
                    <StyledPrevIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {currentWord + 1 !== words_choices.length ? (
                <Tooltip title="Next" placement="top">
                  <IconButton onClick={() => setCurrentWord(currentWord + 1)}>
                    <StyledNextIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  color="primary"
                  onClick={() => {
                    submitLesson(data.id, token);
                    navigate(`/result/${data.id}`);
                  }}
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    words_choices: Object.values(state.words_choices),
  };
};

export default connect(mapStateToProps, { listWord, saveAnswer, submitLesson })(
  Question
);
