import React, {useState, useEffect} from 'react';
import { Route, Router } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { createBrowserHistory } from 'history'
import AppsTable from "./components/AppsTable";
import NavBar from "./NavBar";
import appsStore from "./store/appsStore";
import rolesStore from "./store/rolesStore";
import usersStore from "./store/usersStore";
import RolesTable from "./components/RolesTable";
import {getItemsRequest} from "./requests/itemsRequests";
import UsersTable from "./components/UsersTable";

export const history = createBrowserHistory();
export var title = 'SSO';

const getAppsRequest = () => getItemsRequest("apps", appsStore);
const getRolesRequest = () => getItemsRequest("roles", rolesStore);
const getUsersRequest = () => getItemsRequest("users", usersStore);

const styles = theme => ({
    root: {
        position: 'absolute',
        //display: 'flex',
        height: '100%',
        width: '100%',
    },
    menu: {
        position: 'relative',
        height: '100%',
        width: '20%',
        overflowY: 'auto',
    },
    control: {
        padding: theme.spacing(2),
    },
    siteFrame: {
        flexGrow: 1,
        height: '100%',
        flexWrap: 'nowrap',
    },
    toolbar: {
        width: '100%',
    },
    fullScreen: {
        width: '100%',
        height: '100%',
    },
    scrollable: {
        overflowY: 'auto',
    }
});

const App = (props) => {
    const [apps, setApps] = useState(0);
    const [roles, setRoles] = useState(0);
    const [users, setUsers] = useState(0);
    appsStore.subscribe(() => {setApps(appsStore.getState().data)});
    rolesStore.subscribe(() => {setRoles(rolesStore.getState().data)});
    usersStore.subscribe(() => {setUsers(usersStore.getState().data)});
    const {classes} = props;
    const goTo = (url) => {
        history.push(url);
    };
    useEffect(() => {
        getAppsRequest();
        getRolesRequest();
        getUsersRequest();
    }, []);
    return (
        <Grid container direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.root}>
            <Grid item className={classes.menu} id="menu-item" style={{display:"none"}}>
            </Grid>
            <Grid item className={classes.siteFrame}>
                <Grid className={classes.siteFrame}
                      container direction="column"
                      justify="flex-start"
                      alignItems="flex-start">
                    <Grid item className={classes.toolbar}>
                        <NavBar history = {history}/>
                    </Grid>
                    <Grid item className={`${classes.fullScreen} ${classes.scrollable}`} id="content">
                        <Container className={classes.fullScreen}>
                            <Router history={history}>
                                <div>
                                    <Route path="/apps" component={() =>
                                        <AppsTable apps = {apps}/>
                                    }/>
                                    <Route path="/roles" component={() =>
                                        <RolesTable roles = {roles} apps = {apps}/>
                                    }/>
                                    <Route path="/users" component={() =>
                                        <UsersTable goTo = {goTo} users = {users}/>
                                    }/>
                                </div>
                            </Router>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(App);
