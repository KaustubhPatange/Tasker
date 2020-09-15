import React from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { useStateValue } from "../provider/StateProvider";
import { auth } from "../utils/config";
import Navigation from "./Navigation";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import { actionTypes } from "../provider/reducer";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  iconContainer: {
    position: "relative",
    display: "flex",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  smallIcon: {
    marginRight: theme.spacing(0),
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // Check if the environment is tablet or mobile
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Header(props: any) {
  const theme = useTheme();
  const [{ user, showSearchBar }, dispatch] = useStateValue();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerOpen, setDawerOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const DisplayThemeIcon = () => {
    if (props.darkSwitch) return <Brightness4 />;
    else return <Brightness7 />;
  };

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearchEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: actionTypes.SET_SEARCH_FILTER,
      searchFilter: event.currentTarget.value,
    });
  };

  const handleDrawerOpen = () => {
    setDawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDawerOpen(false);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Tasker
          </Typography>
          {showSearchBar ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={handleSearchEvent}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div className={classes.grow} />
          <div className={classes.iconContainer}>
            <IconButton
              className={classes.smallIcon}
              color="inherit"
              aria-label="change theme"
              onClick={props.onThemeChange}
              edge="end"
            >
              <DisplayThemeIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={user.photoURL} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Navigation
        drawerOpen={drawerOpen}
        onHideButtonClick={handleDrawerClose}
      />
      {renderMenu}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.renderNavigation}
      </main>
    </div>
  );
}

export default Header;
