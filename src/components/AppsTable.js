import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import appsStore from "../store/appsStore";
import {addItemRequest, updateItemRequest, deleteItemRequest} from "../requests/itemsRequests";

const AppsTable = props => {
    appsStore.subscribe(() => {});
    console.log(props.apps);
    const addAppRequest = (newData) => addItemRequest("apps", appsStore, newData);
    const updateAppRequest = (oldData, newData, onSuccess) => updateItemRequest("apps", appsStore, oldData, newData, onSuccess);
    const deleteAppRequest = (oldData) => deleteItemRequest("apps", appsStore, oldData);
    return (
        <MaterialTable
            title="Apps"
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Url', field: 'url' },
            ]}
            data={props.apps.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addAppRequest(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updateAppRequest(oldData, newData);
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            deleteAppRequest(oldData);
                        }, 600);
                    }),
            }}
        />

    );
}
export default AppsTable;