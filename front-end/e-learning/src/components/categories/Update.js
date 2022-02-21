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

  const handleClose = () => {
    setOpen(false);
    onSetState(0);
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const formValues = {
      title: title,
      description: description,
    };
    updateCategory(data.id, formValues, token);
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
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "red",
              }}
            >
              {categories.update_error === undefined ||
              categories.update_error === "no error"
                ? ""
                : "Fields are required"}
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
  updateCategory,
  errorReset,
};
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
