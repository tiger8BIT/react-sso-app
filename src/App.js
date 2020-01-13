import React, {useState, useEffect} from 'react';
import { Route, Router } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddAppForm from "./components/app/AddApp";
import { createBrowserHistory } from 'history'
import AppPage from "./components/app/UpdateApp";
import AppsTable from "./components/AppsTable";
import NavBar from "./NavBar";
import appsStore from "./store/appsStore";
import rolesStore from "./store/rolesStore";
import {setItemsAction} from "./actions";
import RolesTable from "./components/RolesTable";

export const history = createBrowserHistory();
export var title = 'SSO';

const getAppsRequest = () => fetch("http://localhost:8080/sso/apps", {
    crossDomain:true,
    method: 'GET',
    headers: {'Content-Type':'application/json'}
}).then(res => res.json())
    .then(
        (result) => {
            appsStore.dispatch(setItemsAction({isLoaded: true,items: result,error: null}))
        },
        (error) => {
            appsStore.dispatch(setItemsAction({isLoaded: true,items: null,error: error}))
        }
    );

const getRolesRequest = () => fetch("http://localhost:8080/sso/roles", {
    crossDomain:true,
    method: 'GET',
    headers: {'Content-Type':'application/json'}
}).then(res => res.json())
    .then(
        (result) => {
            rolesStore.dispatch(setItemsAction({isLoaded: true,items: result,error: null}))
        },
        (error) => {
            rolesStore.dispatch(setItemsAction({isLoaded: true,items: null,error: error}))
        }
    );

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
    const unsubscribeApps = appsStore.subscribe(() => {setApps(appsStore.getState().data)});
    const unsubscribeRoles = rolesStore.subscribe(() => {setRoles(rolesStore.getState().data)});
    const {classes} = props;
    const goTo = (url) => {
        history.push(url);
    };
    useEffect(() => {
        getAppsRequest();
        getRolesRequest();
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
                                        <AppsTable goTo = {goTo} apps = {apps}/>
                                    }/>
                                    <Route path="/roles" component={() =>
                                        <RolesTable goTo = {goTo} roles = {roles} apps = {apps}/>
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
