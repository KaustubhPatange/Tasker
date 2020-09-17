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
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import {
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import {
  firestoreDb,
  auth,
  firebaseTaskData,
} from "../../utils/firebaseConfig";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const [snackbarState, setSnackbarState] = React.useState(false);
  const [pickDateChecked, setPickDateChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("Invalid");
  const [snackbarType, setSnackbarType] = useState<AlertProps["severity"]>(
    "info"
  );

  useEffect(() => {
    if (props.editMode === true) {
      setTitle(props.editData.title);
      setDescription(props.editData.description);
      setPickDateChecked(props.editData.isDue);
      setSelectedDate(new Date(props.editData.dateString));
    } else {
      setTitle("");
      setDescription("");
      setPickDateChecked(false);
      setSelectedDate(new Date());
    }
    console.log("Render To-do: " + props.editMode);
  }, [props.editMode, props.state]);

  const onSnackbarClose = () => {
    setSnackbarState(false);
  };
  const handlePickDateCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPickDateChecked(event.target.checked);
  };
  const handleOnDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleTitleChange = (event: any) => {
    setTitle(event.currentTarget.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.currentTarget.value);
  };

  function createSnackbar(message: string, type: AlertProps["severity"]) {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarState(true);
  }

  const handleOnSave = () => {
    try {
      if (title.length === 0) throw new Error("brrr");
      const currentDate = selectedDate?.toISOString();

      if (auth.currentUser?.uid === null) throw new Error("brrr");
      pushToFirebase(
        title,
        description,
        currentDate,
        pickDateChecked,
        props.editMode,
        props.editData,
        () => {
          createSnackbar("Successfully saved data", "info");
          props.onClose();
        },
        (error: any) => {
          createSnackbar(
            "Could not save data due to " + error.message,
            "error"
          );
        }
      );
    } catch {
      createSnackbar("Invalid arguments supplied", "error");
    }
  };
  return (
    <div>
      <Dialog
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        open={props.state}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
          Create or edit a task
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            required
            autoFocus
            variant="outlined"
            id="task_title"
            label="Title"
            value={title}
            onChange={handleTitleChange}
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
            value={description}
            onChange={handleDescriptionChange}
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
          <Button autoFocus onClick={handleOnSave} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarState}
        autoHideDuration={2500}
        onClose={onSnackbarClose}
      >
        <Alert onClose={onSnackbarClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

function pushToFirebase(
  title: any,
  description: any,
  currentDate: any,
  pickDueDate: boolean,
  editMode: boolean,
  editData: firebaseTaskData,
  onSuccess: () => void,
  onError: (error: any) => void
) {
  const ref = firestoreDb
    .collection("users")
    .doc(auth.currentUser?.uid!!)
    .collection("tasks");
  if (editMode) {
    const data = {
      title: title,
      description: description,
      dateString: currentDate,
      isDue: pickDueDate,
      created: new Date().toISOString(),
      isCompleted: editData.isCompleted,
      isImportant: editData.isImportant,
    };
    ref
      .doc(editData.id)
      .update(data)
      .then(() => onSuccess())
      .catch((error) => onError(error));
  } else {
    const data = {
      title: title,
      description: description,
      dateString: currentDate,
      created: new Date().toISOString(),
      isDue: pickDueDate,
      isCompleted: false,
      isImportant: false,
    };
    ref
      .add(data)
      .then(() => onSuccess())
      .catch((error) => onError(error));
  }
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface DialogProps {
  editMode: boolean;
  editData: firebaseTaskData | any;
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
