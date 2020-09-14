import "date-fns";
import React, { useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles((theme) => ({
  description: {
    marginTop: theme.spacing(2),
    fontSize: "14px",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  dateTimeLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function TaskAddDialog(props: DialogProps) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>();
  const [pickDateChecked, setPickDateChecked] = useState(false);

  const handlePickDateCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPickDateChecked(event.target.checked);
  };
  const handleOnDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleCloseDialog = () => {
    setPickDateChecked(false);
    props.onClose();
  };
  return (
    <div>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={props.state}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          Create a new task
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            required
            autoFocus
            variant="outlined"
            id="task_title"
            label="Title"
            fullWidth
          />
          <TextField
            multiline
            rowsMax={10}
            className={classes.description}
            autoFocus
            variant="outlined"
            id="task_description"
            label="Description"
            fullWidth
          />
          <div className={classes.dateTimeLayout}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pickDateChecked}
                  onChange={handlePickDateCheckbox}
                  name="gilad"
                />
              }
              label="Pick a due date?"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                variant="inline"
                disabled={!pickDateChecked}
                ampm={false}
                label="With keyboard"
                value={selectedDate}
                onChange={handleOnDateChange}
                onError={console.log}
                disablePast
                format="yyyy/MM/dd HH:mm"
              />
            </MuiPickersUtilsProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface DialogProps {
  state: boolean;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default TaskAddDialog;
