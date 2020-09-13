import { Container, CssBaseline, Fab, makeStyles } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Dashboard(props: any) {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Header
        darkSwitch={props.darkState}
        onThemeChange={props.onThemeChange}
      />
      <Container>
        <Fab className={classes.fab} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Container>
    </div>
  );
}

export default Dashboard;
