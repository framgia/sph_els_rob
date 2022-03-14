import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";

import { updateCategory, errorReset } from "../../actions";

const Update = ({
  errorReset,
  updateCategory,
  categories,
  data,
  onSetState,
  isOpen,
  token,
  user,
  onSetOpenNotification,
  onSetMessage,
}) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [open, setOpen] = useState(isOpen);
  const [error_title, setErrorTitle] = useState("");
  const [error_description, setErrorDescription] = useState("");

  const handleClose = () => {
    setOpen(false);
    onSetState(0);
  };

  const validate = () => {
    var no_error = true;
    if (title === "") {
      setErrorTitle("Field is required!");
      no_error = false;
    } else if (title.length > 255) {
      setErrorTitle("Title is limited to 255 characters!");
      no_error = false;
    } else setErrorTitle("");

    if (description === "") {
      setErrorDescription("Field is required!");
      no_error = false;
    } else setErrorDescription("");

    return no_error;
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const formValues = {
      title: title,
      description: description,
    };
    if (validate()) updateCategory(data.id, formValues, token);
  };

  useEffect(() => {
    if (isNull(categories.update_error)) {
      handleClose();
      errorReset("UPDATE_CATEGORY");
      onSetOpenNotification(true);
      onSetMessage("Successfully updated category ID #" + data.id + "!");
    } else setOpen(true);
  }, [categories.update_error]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Card
        sx={{
          width: "60%",
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
        <CardHeader title={"Update Category ID #" + data.id} />
        <CardContent>
          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={title}
              error={error_title === "" ? false : true}
              helperText={error_title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              name="description"
              label="Description"
              type="description"
              id="description"
              autoComplete="description"
              value={description}
              error={error_description === "" ? false : true}
              helperText={error_description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
  updateCategory,
  errorReset,
};
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
