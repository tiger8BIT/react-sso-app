const initialState = {
    isLoaded: false,
    items: [],
    error: null
};
const dataActions = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS': {
            return action.items;
        }
        case 'UPDATE': {
            let items = [...state.items];
            items[items.indexOf(action.oldData)] = action.newData;
            return {
                isLoaded: true,
                items: items,
                error: null
            };
        }
        case 'DELETE': {
            let items = [...state.items];
            items.splice(items.indexOf(action.oldData), 1);
            return {
                isLoaded: true,
                items: items,
                error: null
            };
        }
        case 'ADD': {
            console.log(action.newData);
            let items = [...state.items];
            items.push(action.newData);
            return {
                isLoaded: true,
                items: items,
                error: null
            };
        }
        default:
            return state
    }
};
export default dataActions