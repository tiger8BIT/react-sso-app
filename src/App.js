import React from 'react';
import { Route, Link, Router } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AddAppForm from "./AddAppForm";
import { createBrowserHistory } from 'history'
import AppPage from "./AppPage";
import AppList from "./AppList";
import NavBar from "./NavBar";
export const history = createBrowserHistory();
export var title = 'SSO';

const styles = theme => ({
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
        borderRight: 1,
        borderColor: "gray",
        boxShadow: 3
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
    active: {
        backgroundColor: "red",
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appId: null,
            appListItem: null,
        };
        this.setAppId = this.setAppId.bind(this);
        this.setAppListItem = this.setAppListItem.bind(this);
        this.setAppListItemText = this.setAppListItemText.bind(this);
    }
    setAppId(id) {
        this.setState(
            prevState => ({
                ...prevState,
                appId: id
        }));
    };
    setAppListItem(item) {
        console.log('----------------------------------------------');
        console.log(this.state.appListItem);
        console.log('----------------------------------------------');
        console.log(item);
        if(this.state.appListItem !== null)
            this.state.appListItem.style="";
        item.style="background-color: red;";
        this.setState(
            prevState => ({
                ...prevState,
                appListItem: item,
        }));
    };
    setAppListItemText(text) {
        this.state.appListItem.text = text;
    }
    goTo(url){
        history.push(url);
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  className={classes.root}>
                <Grid item className={classes.menu} id="menu-item">
                    <AppList goTo = {this.goTo} setAppId = {this.setAppId}  setAppListItem = {this.setAppListItem}/>
                </Grid>
                <Grid item className={classes.siteFrame}>
                    <Grid container direction="column"
                          justify="flex-start"
                          alignItems="flex-start"
                          className={classes.siteFrame}>
                        <Grid item className={classes.toolbar}>
                            <NavBar/>
                        </Grid>
                        <Grid item className={classes.content} id="content">
                            <Router history={history}>
                                <div>
                                    <Route path="/add/app" component={AddAppForm} />
                                    <Route path="/update/app" component={() =>
                                        <AppPage appId={this.state.appId}
                                                 setAppListItemText = {this.setAppListItemText}
                                        />
                                    }/>
                                </div>
                            </Router>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(App);
