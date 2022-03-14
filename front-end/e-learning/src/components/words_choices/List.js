import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";

import { listWord } from "../../actions";
import Update from "./Update";
import Delete from "./Delete";

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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Listmui from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const List = ({ listWord, words_choices, token, id }) => {
  const [edit, setEdit] = useState(null);
  const [del, setDelete] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState("");

  const StyledEditIcon = styled(ModeEditIcon)(({ theme }) => ({
    color: "#464E2E",
  }));

  const StyledDeleteIcon = styled(DeleteRoundedIcon)(({ theme }) => ({
    color: "#BB6464",
  }));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleNotificationClose = () => {
    setOpenNotification(false);
  };

  useEffect(() => {
    listWord(token, id);
  }, [edit]);

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
                          <Typography
                            align="center"
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Options
                          </Typography>
                          {word_choice.choices.map((choice) => (
                            <Grid spacing={2} key={choice.id}>
                              <Grid item>
                                <Listmui disablePadding>
                                  <ListItem>
                                    <ListItemIcon>
                                      {choice.is_correct_answer === 1 ? (
                                        <CircleRoundedIcon fontSize="small" />
                                      ) : (
                                        <RadioButtonUncheckedRoundedIcon fontSize="small" />
                                      )}
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography
                                          color={
                                            choice.is_correct_answer === 1
                                              ? "#32CD32"
                                              : ""
                                          }
                                          sx={{ display: "inline" }}
                                          component="span"
                                          variant="body1"
                                        >
                                          {choice.value}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                </Listmui>
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
                      {word_choice.word.id === edit ? (
                        <Update
                          category_word={word_choice.word}
                          choices={word_choice.choices}
                          onSetState={setEdit}
                          onSetOpenNotification={setOpenNotification}
                          onSetMessage={setMessage}
                          isOpen={true}
                          token={token}
                          id={id}
                        />
                      ) : (
                        ""
                      )}
                      {word_choice.word.id === del ? (
                        <Delete
                          category_word={word_choice.word}
                          onSetState={setDelete}
                          onSetOpenNotification={setOpenNotification}
                          onSetMessage={setMessage}
                          isOpen={true}
                          token={token}
                          id={id}
                        />
                      ) : (
                        ""
                      )}
                    </Grid>
                  );
            })}
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openNotification}
        onClose={handleNotificationClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleNotificationClose}
          severity="success"
          sx={{ width: "100%", bgcolor: "#464E2E" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    words_choices: Object.values(state.words_choices),
  };
};

export default connect(mapStateToProps, { listWord })(List);
