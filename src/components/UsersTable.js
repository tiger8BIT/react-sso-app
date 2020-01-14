import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import rolesStore from "../store/rolesStore";
import {addItemRequest, deleteItemRequest, updateItemRequest} from "../requests/itemsRequests";

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

const UsersTable = props => {
    rolesStore.subscribe(() => {});
    console.log();
    const [state, setState] = React.useState({
        data: props.users.items,
        columns: [
            { title: 'Login', field: 'login',},
            { title: 'Info', field: 'info',},
            { title: 'Apps', render: rowData => <p onClick={e => props.goTo("/roles")}>View</p> },
        ],
    });
    const addUserRequest = (newData) => addItemRequest("users", rolesStore, newData);
    const updateUserRequest = (oldData, newData, onSuccess) => updateItemRequest("users", rolesStore, oldData, newData, onSuccess);
    const deleteUserRequest = (oldData) => deleteItemRequest("users", rolesStore, oldData);

    return (
        <MaterialTable
            title="Users"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addUserRequest(newData);
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updateUserRequest(oldData, newData);
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            console.log(JSON.stringify({id: oldData.id}));
                            deleteUserRequest(oldData);
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />

    );
}
export default withStyles(styles)(UsersTable);