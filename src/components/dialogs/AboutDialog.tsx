import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogActions, DialogContentText, useTheme } from "@material-ui/core";

export default function CustomizedDialogs(props: any) {
  const theme = useTheme();
  return (
    <div>
      <Dialog
        open={props.state}
        onClose={props.onOpenClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"About"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This project is made to learn react.js at first attempt with the
            rich UI inspired from material design.
          </DialogContentText>
          <DialogContentText>
            <span
              style={{ fontSize: "18px", color: theme.palette.text.primary }}
            >
              Contributors
            </span>
            <br />
            <ul>
              <li>
                <b>Kaustubh Patange</b>: Project designer &#38; developer
              </li>
              <li>
                <b>Tanmay Patil</b>: Tester
              </li>
              <li>
                <b>Ketan Kudikyal</b>: Tester
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={props.onOpenClose} color="primary">
            Close
          </Button> */}
          <Button onClick={props.onOpenClose} color="primary" autoFocus>
            Nice
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
