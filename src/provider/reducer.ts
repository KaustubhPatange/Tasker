export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_THEME: "SET_THEME",
    SET_DRAWER_ITEM: "SET_DRAWER_ITEM",
    SET_TASK_DOCS: "SET_TASK_DOCS"
};

export const navigationTypes = {
    HOME: "Home",
    IMPORTANT: "Important",
    TASKS: "Tasks",
}

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
        default:
            return state;
    }
};

export default reducer;