import { Button, makeStyles } from "@material-ui/core";
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
    textTransform: "none",
    background: "#ffffff",
    "&:hover": {
      background: "#ffffff",
    },
  },
  image: {
    marginRight: theme.spacing(2),
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
            .catch((error) => {
              alert(error.message);
            });
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
      <div style={{ display: "table-row", justifyContent: "center" }}>
        <div>
          <Button
            className={classes.button}
            onClick={handleGoogleSignIn}
            variant="contained"
            color="primary"
          >
            <img
              className={classes.image}
              height="20px"
              src="https://img.icons8.com/color/50/000000/google-logo.png"
            />
            Login with Google
          </Button>
        </div>
        <br />
        <div>
          <Button
            className={classes.button}
            onClick={handleGithubSignIn}
            variant="contained"
            color="primary"
          >
            <img
              src="https://image.flaticon.com/icons/png/512/25/25231.png"
              height="20px"
              className={classes.image}
            />
            Login with Github
          </Button>
        </div>
        <br />
        <div>
          <Button
            className={classes.button}
            onClick={handleTwitterSignIn}
            variant="contained"
            color="primary"
          >
            <img
              src="https://mobiledevmemo.com/wp-content/uploads/2014/05/Twitter-Bird.png"
              height="20px"
              className={classes.image}
            />
            Login with Twitter
          </Button>
        </div>
        <br />
        <div>
          <Button
            className={classes.button}
            onClick={handleFacebookSignIn}
            variant="contained"
            color="primary"
          >
            <img
              src="https://www.clipartmax.com/png/small/223-2237173_facebook-messenger-social-media-computer-icons-clip-facebook-f-logo-svg.png"
              height="20px"
              className={classes.image}
            />
            Login with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
