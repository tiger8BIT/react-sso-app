import React, {useState, useEffect} from 'react';
import { Route, Router } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddAppForm from "./components/app/AddApp";
import { createBrowserHistory } from 'history'
import AppPage from "./components/app/UpdateApp";
import AppList from "./components/app/AppsTable";
import NavBar from "./NavBar";
import store from "./store/store";
import {setAppsAction} from "./actions";

export const history = createBrowserHistory();
export var title = 'SSO';

const getAppsRequest = () => fetch("http://localhost:8080/sso/apps", {
    crossDomain:true,
    method: 'GET',
    headers: {'Content-Type':'application/json'}
}).then(res => res.json())
    .then(
        (result) => {
            store.dispatch(setAppsAction({isLoaded: true,items: result,error: null}))
        },
        (error) => {
            store.dispatch(setAppsAction({isLoaded: true,items: null,error: error}))
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
    const unsubscribe = store.subscribe(() => {console.log(store.getState()); setApps(store.getState().apps)});
    const [apps, setApps] = useState(0);
    const {classes} = props;
    const goTo = (url) => {
        history.push(url);
    };
    useEffect(() => {
        getAppsRequest();
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
                        <NavBar/>
                    </Grid>
                    <Grid item className={`${classes.fullScreen} ${classes.scrollable}`} id="content">
                        <Container className={classes.fullScreen}>
                            <Router history={history}>
                                <div>
                                    <Route path="/list/apps" component={() =>
                                        <AppList goTo = {goTo} apps = {store.getState().apps}/>
                                    }/>
                                    <Route path="/add/app" component={AddAppForm} />
                                    <Route path="/update/app" component={() =>
                                        <AppPage/>
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
