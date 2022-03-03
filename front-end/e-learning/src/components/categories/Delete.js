import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { deleteCategory, errorReset } from "../../actions";

const Delete = ({
  errorReset,
  deleteCategory,
  categories,
  data,
  onSetState,
  isOpen,
  token,
  user,
  onSetOpenNotification,
  onSetMessage,
}) => {
  const [open, setOpen] = useState(isOpen);

  const onRemove = (e) => {
    e.preventDefault();
    deleteCategory(data.id, token);
    setOpen(false);
    onSetState(0);
    onSetOpenNotification(true);
    onSetMessage("Successfully removed category ID #" + data.id + "!");
  };

  const handleClose = () => {
    setOpen(false);
    onSetState(0);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Removing Category ID #" + data.id}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to remove this category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            "&:hover": {
              backgroundColor: "#BB6464",
              color: "white",
            },
          }}
        >
          Disagree
        </Button>
        <Button
          onClick={onRemove}
          sx={{
            "&:hover": {
              backgroundColor: "#464E2E",
              color: "white",
            },
          }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  deleteCategory,
  errorReset,
};
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
