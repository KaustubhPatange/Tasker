import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import StarOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import { useStateValue } from "../provider/StateProvider";
import { actionTypes } from "../provider/reducer";
import InfoIcon from "@material-ui/icons/Info";
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

function Navigation(props: any) {
  const [, dispatch] = useStateValue();
  const classes = useStyles();
  const theme = useTheme();
  const renderIcon = (name: any) => {
    switch (name) {
      case "Home":
        return <HomeIcon />;
      case "Important":
        return <StarOutlineIcon />;
      case "Tasks":
        return <AssignmentIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  const handleItemClick = (text: any) => {
    dispatch({
      type: actionTypes.SET_DRAWER_ITEM,
      selected_drawer: text,
    });
  };

  const handleAboutButtonClick = () => {
    // Show a about dialog info
    // It should contain techstack we used
    // It should show how many people were involved in building this.
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.drawerOpen,
          [classes.drawerClose]: !props.drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.drawerOpen,
            [classes.drawerClose]: !props.drawerOpen,
          }),
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.onHideButtonClick}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          {["Home", "Important", "Tasks"].map((text, index) => (
            <ListItem
              onClick={() => {
                handleItemClick(text);
              }}
              button
              key={text}
            >
              <ListItemIcon>{renderIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem button onClick={handleAboutButtonClick}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </Drawer>
    </div>
  );
}

export default Navigation;
