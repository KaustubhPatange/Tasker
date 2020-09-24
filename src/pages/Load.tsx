import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/plane.json";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
  },
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Load() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Lottie height={200} width={200} options={defaultOptions} />
    </div>
  );
}
