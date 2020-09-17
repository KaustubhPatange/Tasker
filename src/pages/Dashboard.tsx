import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useStateValue } from "../provider/StateProvider";
import { actionTypes, navigationTypes } from "../provider/reducer";
import Tasks from "./Tasks";
import { firestoreDb, auth, firebaseData } from "../utils/firebaseConfig";
import { applyDocFilter, applyStripFilter } from "../utils/common";
import Home from "./Home";

function Dashboard(props: any) {
  const [docs, setDocs] = React.useState<firebaseData[]>();
  const [
    { selected_drawer, filterType, taskDocs, invertItems, stripItems },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    console.log("Render dashboard");
    firestoreDb
      .collection("users")
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
    let items = stripItems ? applyStripFilter(docs!!, filterType) : docs!!;
    items = !invertItems
      ? applyDocFilter(items!!, filterType)
      : applyDocFilter(items!!, filterType)?.reverse();
    dispatch({
      type: actionTypes.SET_TASK_DOCS,
      taskDocs: items,
    });
  }, [filterType, invertItems, stripItems]);

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
