import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useStateValue } from "../provider/StateProvider";
import { actionTypes, navigationTypes } from "../provider/reducer";
import Tasks from "./Tasks";
import { db, auth, firebaseData } from "../utils/config";
import { applyDocFilter } from "../utils/common";
import Home from "./Home";

function Dashboard(props: any) {
  const [
    { selected_drawer, filterType, taskDocs, invertItems },
    dispatch,
  ] = useStateValue();
  const [docs, setDocs] = React.useState<firebaseData[]>();

  useEffect(() => {
    console.log("Render dashboard");
    db.collection("users") // TODO: Undo
      .doc(auth.currentUser?.uid!!)
      .collection("tasks")
      .onSnapshot(
        (snapshot) => {
          setDocs(snapshot.docs);
          const items = !invertItems
            ? applyDocFilter(snapshot.docs!!, filterType)
            : applyDocFilter(snapshot.docs!!, filterType)?.reverse();
          dispatch({
            type: actionTypes.SET_TASK_DOCS,
            taskDocs: items,
          });
        },
        (error) => {}
      );
  }, []);

  useEffect(() => {
    console.log("Filter Type: " + filterType);
    const items = !invertItems
      ? applyDocFilter(docs!!, filterType)
      : applyDocFilter(docs!!, filterType)?.reverse();
    dispatch({
      type: actionTypes.SET_TASK_DOCS,
      taskDocs: items,
    });
    // setDocs(applyDocFilter(docs!!, filterType));
  }, [filterType, invertItems]);

  return (
    <div>
      <CssBaseline />
      <Header
        darkSwitch={props.darkState}
        onThemeChange={props.onThemeChange}
        renderNavigation={NavigationRender(selected_drawer)}
      />
    </div>
  );
}

function NavigationRender(selected_drawer: any): any {
  switch (selected_drawer) {
    case navigationTypes.HOME:
      return <Home />;
    case navigationTypes.IMPORTANT:
      return <div>Important</div>;
    case navigationTypes.TASKS:
      return <Tasks />;
    default:
      return <div></div>;
  }
}

export default Dashboard;
