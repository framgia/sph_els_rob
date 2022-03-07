import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { changeRole } from "../actions";

const ChangeRole = (
  changeRole,
  user_id,
  onSetState,
  isOpen,
  token,
  onSetOpenNotification,
  onSetMessage
) => {
  const [open, setOpen] = useState(isOpen);

  const onChange = (e) => {
    e.preventDefault();
    changeRole(user_id, token);
    setOpen(false);
    onSetState(0);
    onSetOpenNotification(true);
    onSetMessage("Successfully change user ID #" + user_id + "'s role!");
  };

  const handleClose = () => {
    setOpen(false);
    onSetState(0);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    console.log("clicked");
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Change role for user ID #" + user_id}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to change the role of this user?
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
          onClick={onChange}
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
    users: Object.values(state.users),
  };
};

export default connect(mapStateToProps, { changeRole })(changeRole);
