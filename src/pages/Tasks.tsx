import { Fab, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import TaskAddDialog from "../components/dialogs/TaskAddDialog";
import { firebaseData, firebaseTaskData } from "../utils/config";
import TaskItem from "../components/TaskItem";
import { convertToTaskItemFrom } from "../utils/common";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-25px",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginLeft: theme.spacing(2),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

type TaskProps = {
  data: firebaseData[];
};

function Tasks(props: TaskProps) {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState<firebaseTaskData | null>(null);

  const handleFabClick = () => {
    setIsEditMode(false);
    setEditData(null);
    setOpenAddDialog(!openAddDialog);
  };

  const onEditClick = (e: firebaseData) => {
    setIsEditMode(true);
    setEditData(convertToTaskItemFrom(e));
    setOpenAddDialog(true);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <h1>Tasks</h1>
          <AssignmentIcon className={classes.icon} />
        </div>
        {props.data != null ? (
          props.data.map((e) => (
            <TaskItem
              key={e.id}
              taskData={convertToTaskItemFrom(e)}
              onEditItemClick={() => onEditClick(e)}
            />
          ))
        ) : (
          <div></div>
        )}
        <Fab
          className={classes.fab}
          onClick={handleFabClick}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <TaskAddDialog
          editData={editData}
          editMode={isEditMode}
          onClose={handleFabClick}
          state={openAddDialog}
        />
      </div>
    </>
  );
}

export default Tasks;
