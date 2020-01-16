import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import rolesStore from "../store/rolesStore";
import {addItemRequest, deleteItemRequest, updateItemRequest} from "../requests/itemsRequests";
import appsStore from "../store/appsStore";

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

const RolesTable = props => {
    appsStore.subscribe(() => {/*setState(prevState => {
        let columns = state.columns;
        columns[2]["lookup"] = appsStore.getState().data.items.reduce((obj, item) => {
            return {
                ...obj,
                [item['id']]: item.name,
            };
        }, {});
        return {
            ...prevState,
            columns: columns,
            apps: appsStore.getState().data.items
        }});
    */});
    rolesStore.subscribe(() => {});
    const addRoleRequest = (newData) => addItemRequest("roles", rolesStore, newData);
    const updateRoleRequest = (oldData, newData, onSuccess) => updateItemRequest("roles", rolesStore, oldData, newData, onSuccess);
    const deleteRoleRequest = (oldData) => deleteItemRequest("roles", rolesStore, oldData);

    return (
        <MaterialTable
            title="Roles"
            columns={[
                { title: 'Name', field: 'roleName' },
                { title: 'Description', field: 'description' },
                { title: 'Application', field: 'appId', lookup: props.apps.isLoaded ? props.apps.items.reduce((obj, item) => {
                        return {
                            ...obj,
                            [item['id']]: item.name,
                        };
                    }) : {}},
            ]}
            data={props.roles.items}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addRoleRequest(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updateRoleRequest(oldData, newData);
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            console.log(JSON.stringify({id: oldData.id}));
                            deleteRoleRequest(oldData);
                        }, 600);
                    }),
            }}
        />

    );
}
export default withStyles(styles)(RolesTable);