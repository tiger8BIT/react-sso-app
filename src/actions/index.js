export const setAppsAction = apps => ({
    type: 'SET_APPS',
    apps
});
export const updateAppAction = (oldData, newData) => ({
    type: 'UPDATE_APP',
    oldData: oldData,
    newData: newData,
});

export const deleteAppAction = (oldData) => ({
    type: 'DELETE_APP',
    oldData: oldData,
});

export const addAppAction = (newData) => ({
    type: 'ADD_APP',
    newData: newData,
});