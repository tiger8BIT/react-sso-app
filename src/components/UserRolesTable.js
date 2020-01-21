import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import rolesStore from "../store/rolesStore";
import {getItemsByIdRequest, addItemsRelationRequest, deleteItemsRelationRequest} from "../requests/itemsRequests";
import usersStore from "../store/usersStore";

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

const UserRolesTable = props => {
    rolesStore.subscribe(() => {});
    const [data, setData] = React.useState([]);
    const addRoleRequest = (itemId) => addItemsRelationRequest("users", props.currentUser.id, "roles", itemId, usersStore, props.currentUser);
    const deleteRoleRequest = (itemId) => deleteItemsRelationRequest("users", props.currentUser.id, "roles", itemId, usersStore, props.currentUser)
    const getRolesRequest = () => getItemsByIdRequest("users", props.currentUser.id, "roles");
    useEffect(() => {
        if (props.currentUser)
            setData(getRolesRequest())
    }, []);
    return (
        <MaterialTable
            title={"Roles of " + props.currentUser.login || "underfind user"}
            columns={[
                { title: 'Role', field: 'roleName', lookup: (props.roles.data && props.roles.length !== 0) ? props.roles.data.reduce((obj, item) => {
                        return {
                            ...obj,
                            [item['id']]: item.roleName,
                        };
                    }, {}) : {}},
                { title: 'Application', field: 'appId', lookup: (props.apps.data && props.apps.length !== 0) ? props.apps.data.reduce((obj, item) => {
                        return {
                            ...obj,
                            [item['id']]: item.name,
                        };
                    }, {}) : {}},
            ]}
            data={data ? data.data || [] : []}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addRoleRequest(newData.roleName);
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            console.log(JSON.stringify({id: oldData.id}));
                            deleteRoleRequest(oldData.id);
                        }, 600);
                    }),
            }}
        />

    );
}
export default withStyles(styles)(UserRolesTable);