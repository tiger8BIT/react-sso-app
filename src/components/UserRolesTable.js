import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import rolesStore from "../store/rolesStore";
import {addItemRequest, deleteItemRequest, getItemsByIdRequest} from "../requests/itemsRequests";

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

const UserRolesTable = props => {
    rolesStore.subscribe(() => {});
    const [state, setState] = React.useState({
        data: [],
        columns: [
            { title: 'Role', field: 'roleName'},
            { title: 'Application', field: 'appId', lookup: props.apps.items ? props.apps.items.reduce((obj, item) => {
                    return {
                        ...obj,
                        [item['id']]: item.name,
                    };
                }, {}) : {}},
        ],
    });
    const addRoleRequest = (newData) => addItemRequest("roles", rolesStore, newData);
    const deleteRoleRequest = (oldData) => deleteItemRequest("roles", rolesStore, oldData);
    const getRolesRequest = (id) => getItemsByIdRequest("users/roles", id);
    useEffect(() => {
        if (props.currentUser)
            setState(prevState => ({...prevState, data: getRolesRequest(props.currentUser.id)}))
    }, []);
    return (
        <MaterialTable
            title={"Roles of " + props.currentUser.login || "underfind user"}
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
export default withStyles(styles)(UserRolesTable);