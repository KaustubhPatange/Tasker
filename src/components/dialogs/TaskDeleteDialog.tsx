import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { db, auth } from "../../utils/config";

function TaskDeleteDialog(props: DeleteProps) {
  const onDeleteClick = () => {
    db.collection("users")
      .doc(auth.currentUser?.uid!!)
      .collection("tasks")
      .doc(props.id)
      .delete()
      .then(() => {})
      .catch((error) => {});
    props.onCloseClick();
  };
  return (
    <>
      <div>
        <Dialog
          open={props.state}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will permanently delete the task from the remote storage. It
              cannot be undone!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onCloseClick} color="primary">
              Cancel
            </Button>
            <Button onClick={onDeleteClick} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

type DeleteProps = {
  state: boolean;
  id: any;
  onCloseClick: () => void;
};

export default TaskDeleteDialog;
