import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";

import { createWord } from "../../actions";

const Create = ({ createWord, words_choices, token, id }) => {
  const initialFields = [
    { id: "a", value: "", is_correct_answer: false },
    { id: "b", value: "", is_correct_answer: false },
    { id: "c", value: "", is_correct_answer: false },
    { id: "d", value: "", is_correct_answer: false },
  ];
  const [word, setWord] = useState("");
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [correct_answer, setCorrectAnswer] = useState("");
  const [fields, setFields] = useState(initialFields);
  const [choice_error, setChoiceError] = useState("");
  const [word_error, setWordError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setChoiceError("");
    setWordError("");
  };

  const validate = () => {
    var no_error = true;
    let newArr = [...fields];
    let empty_choice_count = 0;
    let is_correct_answer_selected = false;
    let is_choice_length_valid = true;

    for (var x = 0; x < fields.length; x++) {
      if (newArr[x]["value"] === "") {
        empty_choice_count++;
      }
      if (newArr[x]["is_correct_answer"] === true)
        is_correct_answer_selected = true;
      if (newArr[x]["value"].length > 255) is_choice_length_valid = false;
    }

    if (empty_choice_count >= 3) {
      setChoiceError("Choices must be more than one!");
      no_error = false;
    } else if (is_correct_answer_selected === false) {
      setChoiceError("Please select the correct answer!");
      no_error = false;
    } else if (is_choice_length_valid === false) {
      setChoiceError("Option is limited to 255 characters!");
      no_error = false;
    } else setChoiceError("");

    if (word === "") {
      setWordError("Word must not be empty!");
      no_error = false;
    } else if (word.length > 255) {
      setWordError("Word is limited to 255 characters!");
      no_error = false;
    } else setWordError("");

    return no_error;
  };

  const onCreate = (e) => {
    e.preventDefault();
    const data = {
      word: word,
      choices: fields,
    };
    if (validate()) {
      createWord(data, token, id);
      setSubmit(true);
    }
  };

  const setTextfield = (index) => (e) => {
    let newArr = [...fields];
    newArr[index]["value"] = e.target.value;
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleNotificationClose = () => {
    setOpenNotification(false);
    setSubmit(false);
  };

  const handleChange = (e) => {
    setCorrectAnswer(e.target.value);
    setFields(
      fields.map((field) =>
        field.id === e.target.value
          ? { ...field, is_correct_answer: true }
          : { ...field, is_correct_answer: false }
      )
    );
  };

  useEffect(() => {
    if (words_choices.create_word_error === undefined) setOpen(false);
    else if (isNull(words_choices.create_word_error)) {
      setOpen(false);
      setOpenNotification(true);
    } else setOpen(true);
  }, [words_choices]);

  return (
    <div className="container">
      <Button
        onClick={handleOpen}
        sx={{
          mt: 2,
          mb: 2,
          bgcolor: "#05386b",
          color: "white",
          "&:hover": {
            backgroundColor: "#edf5e1",
            color: "black",
          },
        }}
      >
        Add Word
      </Button>
      <Modal open={open} onClose={handleClose}>
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
          <CardHeader title={`Add word for category ID #${id}`} />
          <CardContent>
            <form>
              <TextField
                margin="normal"
                required
                fullWidth
                id="word"
                label="Word"
                name="word"
                autoComplete="word"
                autoFocus
                error={word_error === "" ? false : true}
                helperText={word_error}
                onChange={(e) => setWord(e.target.value)}
              />
              <Box>
                <Typography
                  align="center"
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Make two or more options | Choose one correct answer
                </Typography>
                {fields.map((field, index) => (
                  <Grid container spacing={1} columns={12} key={index}>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        margin: "auto",
                      }}
                    >
                      <Radio
                        checked={
                          correct_answer === field.id && field.value !== ""
                        }
                        onChange={handleChange}
                        value={field.id}
                        name="radio-buttons"
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="field.id"
                        label="Option"
                        name="option"
                        autoComplete="option"
                        autoFocus
                        error={
                          field.value === "" && choice_error !== ""
                            ? true
                            : false
                        }
                        onChange={setTextfield(index)}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Box>
              <Box sx={{ color: "red" }}>
                <Typography
                  align="center"
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {choice_error}
                </Typography>
              </Box>
              <CardActions
                disableSpacing
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={onCreate}
                  type="submit"
                  width="50"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    mt: 2,
                    mb: -2,
                    bgcolor: "#464E2E",
                    "&:hover": {
                      backgroundColor: "#edf5e1",
                      color: "black",
                    },
                  }}
                >
                  Add
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Modal>
      {words_choices.create_word_error === null && submit == true ? (
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
            Successfully added word!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    words_choices: state.words_choices,
  };
};

export default connect(mapStateToProps, { createWord })(Create);
