import {
  Card,
  Checkbox,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import StarCheckedIcon from "@material-ui/icons/Star";
import StarUnCheckedIcon from "@material-ui/icons/StarBorder";
import { auth, db, firebaseTaskData } from "../utils/config";
import TaskDeleteDialog from "./dialogs/TaskDeleteDialog";
import MoreIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1, 0),
    display: "grid",
    gridColumnGap: "10px",
    alignItems: "center",
    gridTemplateColumns: "50px auto 30px 30px",
  },
  description: {
    fontSize: "13px",
    color: theme.palette.text.secondary,
  },
  descriptionStrike: {
    fontSize: "13px",
    color: theme.palette.text.secondary,
    textDecorationLine: "line-through",
  },
  descriptionLayout: {
    display: "flex",
    alignItems: "center",
  },
  titleStrike: {
    textDecorationLine: "line-through",
  },
  root: {
    marginBottom: theme.spacing(1),
  },
  importantIcon: {
    cursor: "pointer",
  },
  menuItemIcon: {
    marginRight: theme.spacing(1),
  },
}));

function TaskItem(props: TaskItemProps) {
  const theme = useTheme();
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteItemDialog, setDeleteItemDialog] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleImportantClick = (value: boolean) => {
    const data = db
      .collection("users")
      .doc(auth?.currentUser?.uid!!)
      .collection("tasks")
      .doc(props.taskData.id);
    data.update({
      isImportant: value,
    });
  };

  const handleOnCheckboxClick = (value: boolean) => {
    const data = db
      .collection("users")
      .doc(auth?.currentUser?.uid!!)
      .collection("tasks")
      .doc(props.taskData.id);
    data.update({
      isCompleted: !value,
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-task-context-menu";
  const renderContextMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          props.onEditItemClick();
        }}
      >
        <EditIcon className={classes.menuItemIcon} fontSize="small" />
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          setDeleteItemDialog(true);
        }}
      >
        <DeleteIcon className={classes.menuItemIcon} fontSize="small" />
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <div className={classes.card}>
          <Checkbox
            checked={props.taskData.isCompleted}
            onClick={() => {
              handleOnCheckboxClick(props.taskData.isCompleted);
            }}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <div>
            <Typography>
              {props.taskData.isCompleted ? (
                <span className={classes.titleStrike}>
                  {props.taskData.title}
                </span>
              ) : (
                <span>{props.taskData.title}</span>
              )}
            </Typography>
            <div className={classes.descriptionLayout}>
              {props.taskData.isDue ? (
                <Tooltip
                  title={new Date(props.taskData.dateString).toLocaleString()}
                >
                  <EventIcon
                    style={{ fontSize: "13px", marginRight: theme.spacing(1) }}
                    fontSize="small"
                  />
                </Tooltip>
              ) : (
                <div></div>
              )}
              {props.taskData.isCompleted ? (
                <span className={classes.descriptionStrike}>
                  {props.taskData.description}
                </span>
              ) : (
                <span className={classes.description}>
                  {props.taskData.description}
                </span>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              handleImportantClick(!props.taskData.isImportant);
            }}
            className={classes.importantIcon}
          >
            {props.taskData.isImportant ? (
              <StarCheckedIcon color="secondary" />
            ) : (
              <StarUnCheckedIcon />
            )}
          </div>
          <div style={{ cursor: "pointer" }} onClick={handleMenuOpen}>
            <MoreIcon />
          </div>
        </div>
      </Card>
      {renderContextMenu}
      <TaskDeleteDialog
        id={props.taskData.id}
        state={deleteItemDialog}
        onCloseClick={() => {
          setDeleteItemDialog(false);
        }}
      />
    </div>
  );
}

export type TaskItemProps = {
  taskData: firebaseTaskData;
  onEditItemClick: () => void;
};

export default TaskItem;
