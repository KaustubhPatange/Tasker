import {
  Container,
  CssBaseline,
  Fab,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Header from "../components/Header";
import AddIcon from "@material-ui/icons/Add";
import { useStateValue } from "../provider/StateProvider";
import { navigationTypes } from "../provider/reducer";
import Tasks from "./Tasks";
import { db, auth, firebaseData } from "../utils/config";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    // marginLeft: theme.spacing(10),
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function Dashboard(props: any) {
  const classes = useStyles();
  const [{ selected_drawer }, dispatch] = useStateValue();
  const [docs, setDocs] = React.useState<firebaseData[]>();

  useEffect(() => {
    console.log("Render dashboard");
    db.collection("users") // TODO: Undo
      .doc(auth.currentUser?.uid!!)
      .collection("tasks")
      .onSnapshot(
        (snapshot) => {
          setDocs(snapshot.docs.reverse());
        },
        (error) => {}
      );
  }, []);
  return (
    <div>
      <CssBaseline />
      <Header
        darkSwitch={props.darkState}
        onThemeChange={props.onThemeChange}
        renderNavigation={NavigationRender(selected_drawer, docs!!)}
      />
    </div>
  );
}

function NavigationRender(selected_drawer: any, docs: firebaseData[]): any {
  switch (selected_drawer) {
    case navigationTypes.HOME:
      return <div>Home</div>;
    case navigationTypes.IMPORTANT:
      return <div>Important</div>;
    case navigationTypes.TASKS:
      return <Tasks data={docs} />;
    default:
      return <div></div>;
  }
}

export default Dashboard;
