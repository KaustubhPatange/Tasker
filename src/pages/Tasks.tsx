import { Card, Checkbox, Fab, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import StarCheckedIcon from "@material-ui/icons/Star";
import StarUnCheckedIcon from "@material-ui/icons/StarBorder";
import TaskAddDialog from "../components/dialogs/TaskAddDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-25px",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  card: {
    margin: theme.spacing(1, 0),
    display: "grid",
    gridColumnGap: "10px",
    alignItems: "center",
    gridTemplateColumns: "50px auto 50px",
  },
  description: {
    fontSize: "13px",
    color: theme.palette.text.secondary,
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

function Tasks() {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleFabClick = () => {
    setOpenAddDialog(!openAddDialog);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography>
            <h1>Tasks</h1>
          </Typography>
          <AssignmentIcon className={classes.icon} />
        </div>

        <Card variant="outlined">
          <div className={classes.card}>
            <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
            <div>
              <Typography>
                <span>This is a text</span>
              </Typography>
              <span className={classes.description}>
                This is a small description
              </span>
            </div>
            <StarUnCheckedIcon />
          </div>
        </Card>

        <Fab
          className={classes.fab}
          onClick={handleFabClick}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <TaskAddDialog onClose={handleFabClick} state={openAddDialog} />
      </div>
    </>
  );
}

export default Tasks;
