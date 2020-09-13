import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./provider/serviceWorker";
import { StateProvider } from "./provider/StateProvider";
import reducer, { initialState } from "./provider/reducer";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
