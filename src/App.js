import React, {useState, useEffect} from 'react';
import { Route, Router } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddAppForm from "./App/AddApp";
import { createBrowserHistory } from 'history'
import AppPage from "./App/UpdateApp";
import AppList from "./App/AppsList";
import NavBar from "./NavBar";
export const history = createBrowserHistory();
export var title = 'SSO';

const styles = theme => ({
    root: {
        position: 'absolute',
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    menu: {
        position: 'relative',
        height: '100%',
        width: '33%',
        overflowY: 'auto',
    },
    control: {
        padding: theme.spacing(2),
    },
    siteFrame: {
        flexGrow: 1,
        maxHeight: "100%",
        overflow: 'hidden',
    },
    toolbar: {
        flexGrow: 1,
        overflow: 'hidden',
        width: '100%',
    },
    content: {
        position: 'static',
        overflowY: 'auto',
        width: '100%',
        maxHeight: '100%',
    },
});

const App = (props) => {
    const [appsList, setAppsList] = useState(0);
    const {classes} = props;
    const goTo = (url) => {
        history.push(url);
    };

    const getAppListRequest = () => {
        fetch("http://localhost:8080/sso/apps", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setAppsList(prevState => ({
                            isLoaded: true,
                            items: result,
                            error: null,
                    }));
                },
                (error) => {
                    setAppsList(prevState => ({
                            isLoaded: true,
                            error: error,
                    }));
                }
            )
    };
    useEffect(() => {
        getAppListRequest();
    },[]);
    return (

        <Grid container direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.root}>
            <Grid item className={classes.menu} id="menu-item" style={{display:"none"}}>
            </Grid>
            <Grid item className={classes.siteFrame}>
                <Grid container direction="column"
                      justify="flex-start"
                      alignItems="flex-start">
                    <Grid item className={classes.toolbar}>
                        <NavBar/>
                    </Grid>
                    <Grid item className={classes.content} id="content">
                        <Container><Router history={history}>
                            <div>
                                <Route path="/list/apps" component={() =>
                                    <AppList goTo = {goTo} appsList = {appsList}/>
                                }/>
                                <Route path="/add/app" component={AddAppForm} />
                                <Route path="/update/app" component={() =>
                                    <AppPage/>
                                }/>
                            </div>
                        </Router></Container>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(App);
