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

import { createCategory } from "../../actions";

const Create = ({ createCategory, categories, token, user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [error_title, setErrorTitle] = useState("");
  const [error_description, setErrorDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validate = () => {
    var no_error = true;
    if (title === "") {
      setErrorTitle("Title is required!");
      no_error = false;
    } else if (title.length > 255) {
      setErrorTitle("Title is limited to 255 characters!");
      no_error = false;
    } else setErrorTitle("");

    if (description === "") {
      setErrorDescription("Description is required!");
      no_error = false;
    } else setErrorDescription("");

    return no_error;
  };

  const onCreate = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
    };
    if (validate()) {
      createCategory(data, token);
      setSubmit(true);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleNotificationClose = () => {
    setOpenNotification(false);
    setSubmit(false);
  };

  useEffect(() => {
    if (categories.create_error === undefined) setOpen(false);
    else if (isNull(categories.create_error)) {
      setOpen(false);
      setTitle("");
      setDescription("");
      setOpenNotification(true);
    }
  }, [categories]);

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
        Create Category
      </Button>
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
          <CardHeader title={"Add Category"} />
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
      {categories.create_error === null && submit == true ? (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={openNotification}
          onClose={handleNotificationClose}
          autoHideDuration={3000}
        >
          <Alert
            onClose={handleNotificationClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully added category!
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
    categories: state.categories,
  };
};

export default connect(mapStateToProps, { createCategory })(Create);
