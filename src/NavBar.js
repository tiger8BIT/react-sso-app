import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {title} from "./App";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function AppsMenu(e) {
    var x = document.getElementById('menu-item');
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function NavBar() {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={AppsMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    <Typography variant="h6">
                    </Typography>
                </IconButton>
                <Typography variant="h6" className={classes.title} id="title">
                    {title}
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;