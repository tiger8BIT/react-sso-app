const initialState = {
    data: {
        isLoaded: false,
        items: [],
        error: null
    }
};
const dataActions = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                data: action.items,
            };
        case 'UPDATE': {
            let items = state.data.items;
            items[items.indexOf(action.oldData)] = action.newData;
            return state;
        }
        case 'DELETE': {
            let items = state.data.items;
            items.splice(items.indexOf(action.oldData), 1);
            return state;
        }
        case 'ADD': {
            let items = state.data.items;
            items.push(action.newData);
            return state;
        }
        default:
            return state
    }
};
export default dataActions