const initialState = {
    isLoaded: false,
    data: [],
    error: null
};
const dataActions = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS': {
            return action.response;
        }
        case 'UPDATE': {
            let items;
            if (action.response.success) {
                items = [...state.data];
                items[items.indexOf(action.oldData)] = action.response.data;
            }
            else items = state.data;
            action.response.data = items;
            return action.response;
        }
        case 'DELETE': {
            let items;
            if (action.response.success) {
                items = [...state.data];
                items.splice(items.indexOf(action.oldData), 1);
            }
            else items = state.data;
            action.response.data = items;
            return action.response;
        }
        case 'ADD': {
            let items;
            if (action.response.success) {
                items = [...state.data];
                items.push(action.response.data);
            }
            else items = state.data;
            action.response.data = items;
            return action.response;
        }
        default:
            return state
    }
};
export default dataActions