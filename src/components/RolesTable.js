import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import rolesStore from "../store/rolesStore";
import {updateAction, addAction, deleteAction} from "../actions";

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
    const updateRoleRequest = (oldData, newData) => {
        fetch("http://localhost:8080/sso/update/role", {
            crossDomain: true,
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (result) => {
                setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                });
                rolesStore.dispatch(updateAction(oldData, newData));
            },
            (error) => {
            }
        );
    };
    const addRoleRequest = (newData) => {
        console.log(newData);
        fetch("http://localhost:8080/sso/add/role", {
            crossDomain:true,
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (result) => {
                setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                });
                rolesStore.dispatch(addAction(newData));
            },
            (error) => {
                console.log(error);
            }
        )
    };
    const deleteRoleRequest = (oldData) => {
        fetch("http://localhost:8080/sso/delete/role", {
            crossDomain:true,
            method: "POST",
            body: JSON.stringify(oldData.id),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (result) => {
                setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                });
                rolesStore.dispatch(deleteAction(oldData));
            },
            (error) => {
                console.log(error);
            }
        )
    };

    return (
        <MaterialTable
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addRoleRequest(newData)
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updateRoleRequest(oldData, newData)
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            console.log(JSON.stringify({id: oldData.id}));
                            deleteRoleRequest(oldData)
                        }, 600);
                    }),
            }}
        />

    );
}
export default withStyles(styles)(RolesTable);