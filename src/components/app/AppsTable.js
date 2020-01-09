import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import store from "../../store/store";
import {updateAppAction, addAppAction, deleteAppAction} from "../../actions";

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

function updateAppEvent(id) {
    console.log(id);
}

const AppsTable = props => {
    store.subscribe(() => {});
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Url', field: 'url' },
        ],
        data: props.apps.items
    });

    const { classes } = props;
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
                store.dispatch(updateAppAction(oldData, newData));
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
                store.dispatch(addAppAction(newData));
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
                store.dispatch(deleteAppAction(oldData));
            },
            (error) => {
                console.log(error);
            }
        )
    };

    const AppsListAction = (i) => {
        i.style = "background-color: lightgray;"
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