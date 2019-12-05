import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AddAppForm from "./AddAppForm";
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();
export var title = 'SSO';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        position: 'fixed',
        height: '100%',
        width: '100%',
    },
    menu: {
        height: '100%',
        width: 200,
        overflowY: 'auto',
        borderLeftWidth: 100,
        borderLeftColor: 'gray',
    },
    control: {
        padding: theme.spacing(2),
    },
    siteFrame: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    toolbar: {
        flexGrow: 1,
        overflow: 'hidden',
        width: '100%',
    },
    content: {
        flexGrow: 1,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
}));

function App() {
    const classes = useStyles();
    return (
        <Grid container direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.root}>
            <Grid item className={classes.menu} id="menu-item">
                <Box borderRight={1} borderColor="gray" boxShadow={3} height={1} id="AppList" />
            </Grid>
            <Grid item className={classes.siteFrame}>
                <Grid container direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                      className={classes.siteFrame}>
                    <Grid item className={classes.toolbar}>
                        <Box width={1} id="NavBar"/>
                    </Grid>
                    <Grid item className={classes.content} id="content">
                        <Router history={history}>
                            <div>
                                <Route path="/add/app" component={AddAppForm} />
                            </div>
                        </Router>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
