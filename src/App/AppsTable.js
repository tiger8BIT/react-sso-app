import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

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
    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Url', field: 'url' },
    ];
    const { classes } = props;
    const appsList = props.appsList;
    const updateAppAction = (e, id) => {
        this.props.goTo('/update/app');
    };

    const addAppAction = () => {
        this.props.goTo('/add/app');
    };

    const AppsListAction = (i) => {
        i.style = "background-color: lightgray;"
    };



    return (
        <MaterialTable
            title="Apps"
            columns={columns}
            data={appsList.items}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            props.setApps(prevState => {
                                const data = [...prevState.items];
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
                                props.setApps(prevState => {
                                    const data = [...prevState.items];
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
                            props.setApps(prevState => {
                                const data = [...prevState.items];
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