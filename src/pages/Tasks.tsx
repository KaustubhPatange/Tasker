import {
  Button,
  Chip,
  Divider,
  Fab,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import React, { Component, useEffect } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TaskAddDialog from "../components/dialogs/TaskAddDialog";
import { firebaseData, firebaseTaskData } from "../utils/config";
import TaskItem from "../components/TaskItem";
import { convertToTaskItemFrom } from "../utils/common";
import SortIcon from "@material-ui/icons/Sort";
import ImportantIcon from "@material-ui/icons/StarBorder";
import EventIcon from "@material-ui/icons/Event";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { actionTypes, taskSortTypes } from "../provider/reducer";
import { useStateValue } from "../provider/StateProvider";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import RenderTask from "../components/RenderTask";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-25px",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginLeft: theme.spacing(2),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuItemIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Tasks() {
  const [
    { taskDocs, filterType, invertItems, searchFilter },
    dispatch,
  ] = useStateValue();

  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState<firebaseTaskData | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleFabClick = () => {
    setIsEditMode(false);
    setEditData(null);
    setOpenAddDialog(!openAddDialog);
  };

  const onEditClick = (e: firebaseData) => {
    setIsEditMode(true);
    setEditData(convertToTaskItemFrom(e));
    setOpenAddDialog(true);
  };

  const onSortButtonClick = (data: string) => {
    dispatch({
      type: actionTypes.SET_TASK_FILTER,
      filterType: data,
    });
    setAnchorEl(null);
  };

  const onFilterRemoved = () => {
    dispatch({
      type: actionTypes.SET_TASK_FILTER,
      filterType: taskSortTypes.CREATION_DATE,
    });
  };

  const onInvertItemClicked = () => {
    dispatch({
      type: actionTypes.SET_INVERT,
      invertItems: !invertItems,
    });
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log("Rendered Tasks size: " + taskDocs);
    dispatch({
      type: actionTypes.SET_SHOW_SEARCH,
      showSearchBar: true,
    });
  }, []);

  const menuId = "primary-sort-context-menu";
  const renderContextMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={menuId}
      open={isMenuOpen}
      onClose={() => {
        setAnchorEl(null);
      }}
    >
      <MenuItem
        onClick={() => {
          onSortButtonClick(taskSortTypes.IMPORTANT);
        }}
      >
        <ImportantIcon fontSize="small" className={classes.menuItemIcon} />
        {taskSortTypes.IMPORTANT}
      </MenuItem>
      <MenuItem
        onClick={() => {
          onSortButtonClick(taskSortTypes.DUE_DATE);
        }}
      >
        <EventIcon fontSize="small" className={classes.menuItemIcon} />
        {taskSortTypes.DUE_DATE}
      </MenuItem>
      {/* <MenuItem
        onClick={() => {
          onSortButtonClick(taskSortTypes.CREATION_DATE);
        }}
      >
        <AddBoxIcon fontSize="small" className={classes.menuItemIcon} />
        {taskSortTypes.CREATION_DATE}
      </MenuItem> */}
      <MenuItem
        onClick={() => {
          onSortButtonClick(taskSortTypes.COMPLETED);
        }}
      >
        <CheckCircleOutlineIcon
          fontSize="small"
          className={classes.menuItemIcon}
        />
        {taskSortTypes.COMPLETED}
      </MenuItem>
      <MenuItem
        onClick={() => {
          onSortButtonClick(taskSortTypes.ALPHABETICALLY);
        }}
      >
        <SortByAlphaIcon fontSize="small" className={classes.menuItemIcon} />
        {taskSortTypes.ALPHABETICALLY}
      </MenuItem>
      <Divider />
      <MenuItem onClick={onInvertItemClicked}>
        <ImportExportIcon fontSize="small" className={classes.menuItemIcon} />
        Invert
      </MenuItem>
    </Menu>
  );

  function renderTaskItem(element: any) {
    const filter = searchFilter.toLocaleLowerCase();

    const title = element.data().title.toLocaleLowerCase();
    const description = element.data().description.toLocaleLowerCase();

    // if (
    //   filter === "" &&
    //   !(title.includes(filter) || description.includes(filter))
    // )
    //   return <div></div>;

    return (
      <div>
        <TaskItem
          key={element.id}
          taskData={convertToTaskItemFrom(element)}
          onEditItemClick={() => onEditClick(element)}
        />
      </div>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 65px",
            alignItems: "center",
          }}
        >
          <div className={classes.header}>
            <h1>Tasks</h1>
            <AssignmentIcon className={classes.icon} />
          </div>
          <Tooltip title="Sort by">
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              variant="outlined"
            >
              <SortIcon fontSize="small" />
            </Button>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            gap: theme.spacing(1),
          }}
        >
          {filterType === taskSortTypes.CREATION_DATE ? (
            <div></div>
          ) : (
            <Chip
              color="primary"
              style={{ marginBottom: theme.spacing(2) }}
              variant="outlined"
              label={filterType}
              onDelete={onFilterRemoved}
            />
          )}
          {invertItems ? (
            <Chip
              icon={<ImportExportIcon />}
              color="primary"
              style={{ marginBottom: theme.spacing(2) }}
              variant="outlined"
              label="Inverted"
              onDelete={onInvertItemClicked}
            />
          ) : (
            <div></div>
          )}
        </div>
        {taskDocs != null ? (
          taskDocs.map((e: any) => (
            <RenderTask
              searchFilter={searchFilter}
              data={e}
              onEditClick={onEditClick}
            />
          ))
        ) : (
          <div>Empty</div> //TODO: Show something cool in empty
        )}
        <Fab
          className={classes.fab}
          onClick={handleFabClick}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <TaskAddDialog
          editData={editData}
          editMode={isEditMode}
          onClose={handleFabClick}
          state={openAddDialog}
        />
        {renderContextMenu}
      </div>
    </>
  );
}

export default Tasks;
