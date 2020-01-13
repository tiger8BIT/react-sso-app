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

const NavBar = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.history.location.pathname);
    const handleCallToRouter = (event, value) => {
        setValue(value);
        props.history.push(value);
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={AppsMenu} value={value} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    <Typography variant="h6">
                    </Typography>
                </IconButton>
                <Typography variant="h6" id="title">
                    {title}
                </Typography>
                <Tabs value={props.history.location.pathname} onChange={handleCallToRouter}  className={classes.title}>
                    <Tab label="Home" value="/"/>
                    <Tab label="Apps" value="/apps"/>
                    <Tab label="Roles" value="/roles"/>
                </Tabs>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;