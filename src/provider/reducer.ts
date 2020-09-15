export const actionTypes = {
    SET_USER: "SET_USER",
    SET_THEME: "SET_THEME",
    SET_DRAWER_ITEM: "SET_DRAWER_ITEM",
    SET_TASK_DOCS: "SET_TASK_DOCS",
    SET_TASK_FILTER: "SET_TASK_FILTER",
    SET_INVERT: "SET_INVERT",
    SET_SHOW_SEARCH: "SET_SHOW_SEARCH",
};

export const navigationTypes = {
    HOME: "Home",
    IMPORTANT: "Important",
    TASKS: "Tasks",
}

export const taskSortTypes = {
    IMPORTANT: "Important",
    DUE_DATE: "Due date",
    CREATION_DATE: "Creation date",
    COMPLETED: "Completed",
    ALPHABETICALLY: "Alphabetically"
}

export const initialState = {
    user: null,
    taskDocs: null,
    filterType: taskSortTypes.CREATION_DATE,
    invertItems: false,
    showSearchBar: false,
};

const reducer = (state: any, action: any) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case actionTypes.SET_THEME:
            return {
                ...state,
                darkState: action.darkState
            };
        case actionTypes.SET_DRAWER_ITEM:
            return {
                ...state,
                selected_drawer: action.selected_drawer
            }
        case actionTypes.SET_TASK_DOCS:
            return {
                ...state,
                taskDocs: action.taskDocs
            }
        case actionTypes.SET_TASK_FILTER:
            return {
                ...state,
                filterType: action.filterType
            }
        case actionTypes.SET_INVERT:
            return {
                ...state,
                invertItems: action.invertItems
            }
        case actionTypes.SET_SHOW_SEARCH:
            return {
                ...state,
                showSearchBar: action.showSearchBar
            }
        default:
            return state;
    }
};

export default reducer;