export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_THEME: "SET_THEME",
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
        default:
            return state;
    }
};

export default reducer;