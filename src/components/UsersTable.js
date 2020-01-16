import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import usersStore from "../store/usersStore";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {addItemRequest, deleteItemRequest, updateItemRequest} from "../requests/itemsRequests";

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

const UsersTable = props => {
    usersStore.subscribe(() => {});

    const addUserRequest = (newData) => addItemRequest("users", usersStore, newData);
    const updateUserRequest = (oldData, newData, onSuccess) => updateItemRequest("users", usersStore, oldData, newData, onSuccess);
    const deleteUserRequest = (oldData) => deleteItemRequest("users", usersStore, oldData);

    return (
        <MaterialTable
            title="Users"
            columns={[
                { title: 'Login', field: 'login',},
                { title: 'Info', field: 'info',},
                { title: 'Apps', render: rowData =>
                        <Typography>
                            <Link href="#" onClick={e => {props.setCurrentUser(rowData); props.goTo("/user/roles")}}>
                                View
                            </Link>
                        </Typography>
                },
            ]}
            data={props.users.items}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addUserRequest(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updateUserRequest(oldData, newData);
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            console.log(JSON.stringify({id: oldData.id}));
                            deleteUserRequest(oldData);
                        }, 600);
                    }),
            }}
        />

    );
}
export default withStyles(styles)(UsersTable);