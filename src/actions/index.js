export const setItemsAction = items => ({
    type: 'SET_ITEMS',
    items: items
});
export const updateAction = (oldData, newData) => ({
    type: 'UPDATE',
    oldData: oldData,
    newData: newData,
});

export const deleteAction = (oldData) => ({
    type: 'DELETE',
    oldData: oldData,
});

export const addAction = (newData, id) => {
    newData.id = id;
    return {
        type: 'ADD',
        newData: newData,
        id: id,
    }
};