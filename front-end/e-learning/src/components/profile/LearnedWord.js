import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import { learnedWord } from "../../actions";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

const LearnedWord = ({ learnedWord, learned_words, id }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [expanded, setExpanded] = useState(false);

  //   let { id } = useParams();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    learnedWord(id, cookies.token);
  }, []);

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        height: "90%",
        overflow: "auto",
        margin: "auto",
        p: "1%",
      }}
    >
      {learned_words !== null
        ? learned_words.map((learned_word, index) => {
            return (
              <Accordion
                key={index}
                expanded={expanded === learned_word.id}
                onChange={handleChange(learned_word.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                    }}
                    color={expanded === learned_word.id ? "#BB6464" : "#05386b"}
                  >
                    {learned_word.title} ({learned_word.answers.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ border: 2, borderColor: "#BB6464", borderRadius: 2 }}
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
                      xs={6}
                      align="center"
                      sx={{
                        margin: "auto",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#05386b",
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        Words
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      sx={{
                        margin: "auto",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#05386b",
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        Answers
                      </Typography>
                    </Grid>
                  </Grid>
                  {learned_word.answers.map((answer, index) => {
                    return (
                      <Grid
                        container
                        key={index}
                        columns={12}
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Grid
                          item
                          xs={6}
                          align="center"
                          sx={{
                            margin: "auto",
                            p: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#05386b",
                              fontSize: 14,
                            }}
                          >
                            {answer.word}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          align="center"
                          sx={{
                            margin: "auto",
                            p: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#05386b",
                              fontSize: 14,
                            }}
                          >
                            {answer.choice}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })
        : ""}
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    learned_words: Object.values(state.learned_words),
  };
};

export default connect(mapStateToProps, { learnedWord })(LearnedWord);
