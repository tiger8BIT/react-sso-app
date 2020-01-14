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

const RolesTable = props => {
    rolesStore.subscribe(() => {});
    console.log();
    const [state, setState] = React.useState({
        data: props.roles.items,
        columns: [
            { title: 'Name', field: 'roleName' },
            { title: 'Description', field: 'description' },
            { title: 'Application', field: 'appId', lookup: props.apps.items ? props.apps.items.reduce((obj, item) => {
                    return {
                        ...obj,
                        [item['id']]: item.name,
                    };
                }, {}) : {}},
        ],
    });
    const addRoleRequest = (newData) => addItemRequest("roles", rolesStore, newData);
    const updateRoleRequest = (oldData, newData, onSuccess) => updateItemRequest("roles", rolesStore, oldData, newData, onSuccess);
    const deleteRoleRequest = (oldData) => deleteItemRequest("roles", rolesStore, oldData);

    return (
        <MaterialTable
            title="Roles"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addRoleRequest(newData);
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
                                updateRoleRequest(oldData, newData);
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
                            deleteRoleRequest(oldData);
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
export default withStyles(styles)(RolesTable);