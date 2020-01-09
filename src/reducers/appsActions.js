const initialState = {
    apps: {
        isLoaded: false,
        items: [],
        error: null
    }
};
const appsActions = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_APPS':
            return {
                ...state,
                apps: action.apps,
            };
        case 'UPDATE_APP': {
            let items = state.apps.items;
            items[items.indexOf(action.oldData)] = action.newData;
            return state;
        }
        case 'DELETE_APP': {
            let items = state.apps.items;
            items.splice(items.indexOf(action.oldData), 1);
            return state;
        }
        case 'ADD_APP': {
            let items = state.apps.items;
            items.push(action.newData);
            return state;
        }
        default:
            return state
    }
};
export default appsActions