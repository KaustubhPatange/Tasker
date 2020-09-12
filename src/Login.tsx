import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./config";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [state, dispatch] = useStateValue();
  const handleClick = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="primary">
        Primary
      </Button>
    </div>
  );
}

export default Login;
