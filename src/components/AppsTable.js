import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import appsStore from "../store/appsStore";
import {addItemRequest, updateItemRequest, deleteItemRequest} from "../requests/itemsRequests";

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

const AppsTable = props => {
    appsStore.subscribe(() => {});
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Url', field: 'url' },
        ],
        data: props.apps.items
    });
    const addAppRequest = (newData) => addItemRequest("apps", appsStore, newData);
    const updateAppRequest = (oldData, newData, onSuccess) => updateItemRequest("apps", appsStore, oldData, newData, onSuccess);
    const deleteAppRequest = (oldData) => deleteItemRequest("apps", appsStore, oldData);
    return (
        <MaterialTable
            title="Apps"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addAppRequest(newData);
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
                                updateAppRequest(oldData, newData);
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
                            deleteAppRequest(oldData);
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
export default withStyles(styles)(AppsTable);