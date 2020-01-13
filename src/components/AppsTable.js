import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import appsStore from "../store/appsStore";
import {updateAction, addAction, deleteAction} from "../actions";

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
    const updateAppRequest = (oldData, newData) => {
        fetch("http://localhost:8080/sso/update/app", {
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
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                });
                appsStore.dispatch(updateAction(oldData, newData));
            },
            (error) => {
            }
        );
    };
    const addAppRequest = (newData) => {
        fetch("http://localhost:8080/sso/add/app", {
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
                appsStore.dispatch(addAction(newData));
            },
            (error) => {
                console.log(error);
            }
        )
    };
    const deleteAppRequest = (oldData) => {
        fetch("http://localhost:8080/sso/delete/app", {
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
                appsStore.dispatch(deleteAction(oldData));
            },
            (error) => {
                console.log(error);
            }
        )
    };

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
                            addAppRequest(newData)
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updateAppRequest(oldData, newData)
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            console.log(JSON.stringify({id: oldData.id}));
                            deleteAppRequest(oldData)
                        }, 600);
                    }),
            }}
        />

    );
}
export default withStyles(styles)(AppsTable);