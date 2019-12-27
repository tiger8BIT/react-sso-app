import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    listSubheader: {
        minHeight: 64,
        backgroundColor: '#E5E5E5',
    },
});

function updateAppEvent(id) {
    console.log(id);
}

const AppsList = props => {
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

    useEffect(() => {
        let allListItems = document.querySelectorAll(".MuiListItem-root");
        console.log(allListItems);
        if(allListItems != null)
            allListItems.forEach(i => i.addEventListener("click", e => AppsListAction(i), false));
    });

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader className={classes.listSubheader} component="div" id="nested-list-subheader">
                    Apps
                </ListSubheader>}>
            <ListItem id="add-app-button" button>
                <ListItemIcon>
                    <AddCircleIcon/>
                </ListItemIcon>
                <ListItemText primary="Add new app" />
            </ListItem>
            {   appsList.items ?
                appsList.items.map(item => (
                <ListItem button key={item.id}>
                    <ListItemText primary={item.name}/>
                </ListItem>))
                    : <p>Список пуст</p>
            }
        </List>
    );
}
export default withStyles(styles)(AppsList);