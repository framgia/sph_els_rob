import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { deleteWord } from "../../actions";

const Delete = ({
  deleteWord,
  category_word,
  onSetState,
  isOpen,
  token,
  onSetOpenNotification,
  onSetMessage,
}) => {
  const [open, setOpen] = useState(isOpen);

  const onRemove = (e) => {
    e.preventDefault();
    deleteWord(category_word.id, token);
    setOpen(false);
    onSetState(0);
    onSetOpenNotification(true);
    onSetMessage(`Successfully removed word ${category_word.value}!`);
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
      <DialogTitle>{`Removing Word ${category_word.value}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to remove this word?
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

const mapStateToProps = (state) => {
  return {
    words_choices: state.words_choices,
  };
};

export default connect(mapStateToProps, { deleteWord })(Delete);
