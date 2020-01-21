export const setItemsAction = response => ({
    type: 'SET_ITEMS',
    response: response
});
export const updateAction = (oldData, response) => ({
    type: 'UPDATE',
    oldData: oldData,
    response: response,
});

export const deleteAction = (oldData, response) => ({
    type: 'DELETE',
    oldData: oldData,
    response: response,
});

export const addAction = (response) => {
    return {
        type: 'ADD',
        response: response,
    }
};