import { Button, makeStyles } from "@material-ui/core";
import firebase from "firebase";
import React from "react";
import { auth, provider } from "./config";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
  },
  button: {
    background: "#ffffff",
    "&:hover": {
      background: "#ffffff",
    },
  },
  image: {
    marginRight: theme.spacing(1),
  },
}));
function Login() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const handleClick = () => {
    if (auth.currentUser != null) {
      dispatch({
        type: actionTypes.SET_USER,
        user: auth.currentUser,
      });
    } else {
      auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          auth
            .signInWithPopup(provider)
            .then((result) => {})
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  };

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        onClick={handleClick}
        variant="contained"
        color="primary"
      >
        <img
          className={classes.image}
          height="20px"
          src="https://img.icons8.com/color/50/000000/google-logo.png"
        />
        Sign In
      </Button>
    </div>
  );
}

export default Login;
