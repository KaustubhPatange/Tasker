import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import "./App.css";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
import Login from "./pages/Login";
import { useStateValue } from "./provider/StateProvider";
import { actionTypes } from "./provider/reducer";
import { auth } from "./utils/firebaseConfig";
import Load from "./pages/Load";
import Dashboard from "./pages/Dashboard";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [darkState, setDarkState] = React.useState(
    Boolean(localStorage.getItem("darkState"))
  );
  const [loadComplete, setLoadComplete] = React.useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!loadComplete) {
        // Let's give user some time to enjoy the animation shall we?
        setTimeout(() => {
          setLoadComplete(true);
        }, 500);
      }
      dispatch({
        type: actionTypes.SET_USER,
        user: authUser,
      });
    });
  }, []);

  if (!loadComplete) {
    return <Load />;
  } else {
    const handleDisplayTheme = () => {
      localStorage.setItem("darkState", String(darkState));
      setDarkState(!darkState);
    };
    return (
      <>
        {user == null ? (
          <Login />
        ) : (
          <ThemeProvider theme={darkTheme}>
            <Dashboard
              darkState={darkState}
              onThemeChange={handleDisplayTheme}
            />
          </ThemeProvider>
        )}
      </>
    );
  }
}

export default App;
