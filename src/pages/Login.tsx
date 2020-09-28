import { Button, Card, Divider, makeStyles } from "@material-ui/core";
import firebase from "firebase";
import React from "react";
import { auth, firestoreDb } from "../utils/firebaseConfig";
import { actionTypes } from "../provider/reducer";
import { useStateValue } from "../provider/StateProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
  },
  button: {
    margin: theme.spacing(0.4),
    textTransform: "none",
    background: "#ffffff",
    "&:hover": {
      background: "#ffffff",
    },
  },
  image: {
    height: "20px",
    marginRight: theme.spacing(1.5),
  },
  card: {
    minWidth: 275,
  },
}));

function Login() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const signInFlow = (provider: firebase.auth.AuthProvider) => {
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
            .then((result) => {
              const ref = firestoreDb.collection("users").doc(result.user?.uid);
              ref
                .set({
                  displayName: result.user?.displayName,
                  email: result.user?.email,
                  uid: result.user?.uid,
                  profileUrl: result.user?.photoURL,
                })
                .then(() => {
                  console.log("Data saved: " + result.user?.email);
                });
            })
            .catch((error) => {});
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInFlow(new firebase.auth.GoogleAuthProvider());
  };

  const handleFacebookSignIn = () => {
    signInFlow(new firebase.auth.FacebookAuthProvider());
  };

  const handleGithubSignIn = () => {
    signInFlow(new firebase.auth.GithubAuthProvider());
  };

  const handleTwitterSignIn = () => {
    signInFlow(new firebase.auth.TwitterAuthProvider());
  };

  return (
    <div className={classes.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeItems: "center",
        }}
      >
        <img
          height="300px"
          style={{ textAlign: "center", color: "#066FEF" }}
          src="https://assets-ouch.icons8.com/download/557/a0d61423-fae5-4b87-b204-9f82ef5d70f0.png?filename=lime-list-is-empty.png"
        />
        <Card elevation={5} className={classes.card}>
          <Button
            fullWidth
            disableElevation={false}
            className={classes.button}
            onClick={handleGoogleSignIn}
            color="primary"
          >
            <img
              className={classes.image}
              src="https://img.icons8.com/color/50/000000/google-logo.png"
            />
            <span>Login with Google &nbsp;&nbsp;&nbsp;</span>
          </Button>
          <Divider />
          <Button
            fullWidth
            disableElevation={false}
            className={classes.button}
            onClick={handleGithubSignIn}
            color="primary"
          >
            <img
              className={classes.image}
              src="https://img.icons8.com/material-sharp/48/000000/github.png"
            />
            <span>Login with Github &nbsp;&nbsp;&nbsp;</span>
          </Button>
          <Divider />
          <Button
            fullWidth
            disableElevation={false}
            className={classes.button}
            onClick={handleTwitterSignIn}
            color="primary"
          >
            <img
              className={classes.image}
              src="https://img.icons8.com/color/48/000000/twitter.png"
            />
            <span>Login with Twitter &nbsp;&nbsp;&nbsp;</span>
          </Button>
          <Divider />
          <Button
            fullWidth
            disableElevation={false}
            className={classes.button}
            onClick={handleFacebookSignIn}
            color="primary"
          >
            <img
              className={classes.image}
              src="https://img.icons8.com/color/48/000000/facebook.png"
            />
            <span>Login with Facebook</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Login;
