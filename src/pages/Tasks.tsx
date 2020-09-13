import { Card, Fab, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-25px",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  card: {
    display: "flex",
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
          <div className={classes.card}></div>
        </Card>

        <Fab className={classes.fab} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}

export default Tasks;
