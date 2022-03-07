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
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";

import { updateWord, errorReset } from "../../actions";

const initialFields = [
  { id: "a", value: "", is_correct_answer: false },
  { id: "b", value: "", is_correct_answer: false },
  { id: "c", value: "", is_correct_answer: false },
  { id: "d", value: "", is_correct_answer: false },
];

const Update = ({
  category_word,
  choices,
  onSetState,
  isOpen,
  token,
  onSetOpenNotification,
  onSetMessage,
  id,
  updateWord,
  errorReset,
  words_choices,
}) => {
  const [word, setWord] = useState(category_word.value);
  const [fields, setFields] = useState(initialFields);
  const [open, setOpen] = useState(isOpen);
  const [correct_answer, setCorrectAnswer] = useState("");
  const [choice_error, setChoiceError] = useState("");
  const [word_error, setWordError] = useState("");
  const [change, setChange] = useState("");

  const validate = () => {
    var no_error = true;
    let newArr = [...fields];
    let empty_choice_count = 0;
    let is_correct_answer_selected = false;
    for (var x = 0; x < fields.length; x++) {
      if (newArr[x]["value"] === "") {
        empty_choice_count++;
      }
      if (newArr[x]["is_correct_answer"] === true)
        is_correct_answer_selected = true;
    }
    if (empty_choice_count >= 3) {
      setChoiceError("Choices must be more than one!");
      no_error = false;
    } else if (is_correct_answer_selected === false) {
      setChoiceError("Please select the correct answer!");
      no_error = false;
    } else setChoiceError("");
    if (word === "") {
      setWordError("Word must not be empty!");
      no_error = false;
    } else setWordError("");
    return no_error;
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const data = {
      word: word,
      choices: fields,
    };

    console.log(data);

    if (validate()) {
      updateWord(category_word.id, data, token);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onSetState(0);
  };

  const setTextfield = (index) => (e) => {
    let newArr = [...fields];
    newArr[index]["value"] = e.target.value;
    setChange(e.target.value);
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
    let newArr = [...fields];
    let dataArr = [...choices];

    for (var x = 0; x < choices.length; x++) {
      newArr[x]["value"] = dataArr[x]["value"];
      if (dataArr[x]["is_correct_answer"] === 1) {
        newArr[x]["is_correct_answer"] = true;
        setCorrectAnswer(newArr[x]["id"]);
      } else newArr[x]["is_correct_answer"] = false;
    }

    for (; x < fields.length; x++) {
      newArr[x]["value"] = "";
      newArr[x]["is_correct_answer"] = false;
    }
  }, []);

  useEffect(() => {}, [change]);

  useEffect(() => {
    if (isNull(words_choices.update_word_error)) {
      handleClose();
      errorReset("UPDATE_WORD");
      onSetOpenNotification(true);
      onSetMessage("Successfully updated word ID #" + category_word.id + "!");
    } else setOpen(true);
  }, [words_choices.update_word_error]);

  return (
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
        <CardHeader title={`Update word for category ID #${id}`} />
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
              value={word}
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
                      onChange={field.value !== "" ? handleChange : null}
                      name="radio-buttons"
                      value={field.id}
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
                      value={field.value}
                      error={
                        field.value === "" && choice_error !== "" ? true : false
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
                onClick={onUpdate}
                type="submit"
                width="50"
                variant="contained"
                endIcon={<SaveIcon />}
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
                Save
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

const mapDispatchToProps = {
  updateWord,
  errorReset,
};

const mapStateToProps = (state) => {
  return {
    words_choices: state.words_choices,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
