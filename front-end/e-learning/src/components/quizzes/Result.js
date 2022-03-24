import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";

import Header from "../Header";
import { result } from "../../actions";

const Result = ({ result, results }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [open, setOpen] = useState(true);
  const [score, setScore] = useState(0);
  let { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    setScore(0);
    if (cookies.token === undefined) {
      navigate("/");
    }
    result(id, cookies.token);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let count = 0;
    results.map((res) => {
      if (res.is_correct === 1) {
        count++;
      }
    });
    setScore(count);
  }, [open]);

  return (
    <div>
      <Header title="Result" />
      <Grid
        container
        sx={{
          width: "45%",
          margin: "auto",
          mt: 5,
          p: "1%",
          border: 0,
        }}
      >
        <Grid item xs>
          <Typography
            gutterBottom
            sx={{
              color: "#05386b",
              fontWeight: "bold",
              mb: "20px",
              fontSize: 18,
            }}
          >
            {cookies.category.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            gutterBottom
            sx={{
              color: "#05386b",
              fontWeight: "bold",
              mb: "20px",
              fontSize: 18,
            }}
          >
            Result: {score}/{cookies.category.words_count}
          </Typography>
        </Grid>
      </Grid>
      <Paper
        variant="outlined"
        sx={{
          width: "40%",
          margin: "auto",
          p: "1%",
          border: 0,
        }}
      >
        {open ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "40%",
            }}
          >
            <CircularProgress color="inherit" />
            <Typography
              gutterBottom
              sx={{
                color: "#05386b",
                mb: "20px",
                fontSize: 18,
                mt: 2,
              }}
            >
              Calculating...
            </Typography>
          </Box>
        ) : (
          <Box marginTop="10px" sx={{ maxHeight: 600 }}>
            <Grid
              item
              xs={12}
              container
              spacing={0}
              sx={{ width: "100%", margin: "auto", p: 2 }}
            >
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <Typography
                  gutterBottom
                  sx={{
                    color: "#464E2E",
                    fontWeight: "bold",
                    mb: "20px",
                    textAlign: "center",
                  }}
                >
                  Word
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography
                  gutterBottom
                  sx={{
                    color: "#464E2E",
                    fontWeight: "bold",
                    mb: "20px",
                    textAlign: "center",
                  }}
                >
                  Answer
                </Typography>
              </Grid>
            </Grid>
            {results.map((result, index) => {
              return (
                <div>
                  <Grid
                    item
                    key={index}
                    xs={12}
                    container
                    spacing={0}
                    sx={{
                      width: "100%",
                      margin: "auto",
                      p: 1.5,
                    }}
                  >
                    <Grid item xs={2} sx={{ margin: "auto" }}>
                      {result.is_correct !== null ? (
                        <div>
                          {result.is_correct === 1 ? (
                            <CircleOutlinedIcon
                              fontSize="large"
                              sx={{ color: "green" }}
                            />
                          ) : (
                            <ClearIcon fontSize="large" sx={{ color: "red" }} />
                          )}
                        </div>
                      ) : (
                        <PriorityHighOutlinedIcon
                          fontSize="large"
                          sx={{ color: "blue" }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={5} sx={{ margin: "auto" }}>
                      <Typography
                        gutterBottom
                        sx={{
                          mb: "20px",
                          textAlign: "center",
                        }}
                      >
                        {result.word}
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ margin: "auto" }}>
                      <Typography
                        gutterBottom
                        sx={{
                          mb: "20px",
                          textAlign: "center",
                        }}
                      >
                        {result.choice !== null ? result.choice : "NO ANSWER"}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Grid item>
                <Link href="/category" variant="body2">
                  {"Want to learn more?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    results: Object.values(state.results),
  };
};

export default connect(mapStateToProps, { result })(Result);
