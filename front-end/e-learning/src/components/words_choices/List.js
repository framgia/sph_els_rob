import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";

import { listWord } from "../../actions";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const List = ({ listWord, words_choices, token, id }) => {
  const [edit, setEdit] = useState(null);
  const [del, setDelete] = useState(null);

  const StyledEditIcon = styled(ModeEditIcon)(({ theme }) => ({
    color: "#464E2E",
  }));

  const StyledDeleteIcon = styled(DeleteRoundedIcon)(({ theme }) => ({
    color: "#BB6464",
  }));

  useEffect(() => {
    listWord(token, id);
  }, []);

  return (
    <Container maxWidth="96%">
      <Paper
        sx={{
          width: "100%",
          overflow: "auto",
          margin: "auto",
          p: "1%",
        }}
      >
        <Box marginTop="10px" sx={{ maxHeight: 600 }}>
          <Grid container spacing={2}>
            {words_choices.map((word_choice, index) => {
              if (!isNull(word_choice))
                if (word_choice.word !== undefined)
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
                        <CardHeader title={word_choice.word.value} />
                        <CardContent sx={{ flexGrow: 1 }}>
                          {word_choice.choices.map((choice) => (
                            <Grid spacing={2} key={choice.id}>
                              <Grid
                                item
                                sx={{
                                  margin: "8px",
                                }}
                              >
                                <Typography
                                  color={
                                    choice.is_correct_answer === 1
                                      ? "#32CD32"
                                      : ""
                                  }
                                >
                                  {choice.value}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                        </CardContent>
                        <CardActions
                          disableSpacing
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Tooltip title="Update" placement="top">
                            <IconButton
                              onClick={() => setEdit(word_choice.word.id)}
                            >
                              <StyledEditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remove" placement="top">
                            <IconButton
                              onClick={() => setDelete(word_choice.word.id)}
                            >
                              <StyledDeleteIcon />
                            </IconButton>
                          </Tooltip>
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
    words_choices: Object.values(state.words_choices),
  };
};

export default connect(mapStateToProps, { listWord })(List);
