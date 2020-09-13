import {
  Container,
  createMuiTheme,
  CssBaseline,
  Fab,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { auth } from "./config";
import Load from "./Load";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function App() {
  const [{ user }, dispatch] = useStateValue();
  const handleFabClick = (event: any) => {};
  const classes = useStyles();
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

  const handleDisplayTheme = () => {
    localStorage.setItem("darkState", String(darkState));
    setDarkState(!darkState);
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!loadComplete) {
        setLoadComplete(true);
      }
      dispatch({
        type: actionTypes.SET_USER,
        user: authUser,
      });
    });
  }, [auth]);

  if (!loadComplete) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Load />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        {user == null ? (
          <Login />
        ) : (
          <div>
            <CssBaseline />
            <Header darkSwitch={darkState} onThemeChange={handleDisplayTheme} />
            <Container>
              <Fab
                onClick={handleFabClick}
                className={classes.fab}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </Container>
          </div>
        )}
      </ThemeProvider>
    );
  }
}

export default App;
