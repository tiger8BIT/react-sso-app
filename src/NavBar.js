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

const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "static",
        backgroundColor: "black",
    },
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
    const tabs = {'home':"/", apps:"/apps", roles:"/roles", users:"/users"};
    const classes = useStyles();
    const [value, setValue] = React.useState(tabs[getKey(tabs,props.history.location.pathname)] || false);
    const handleCallToRouter = (event, value) => {
        setValue(value);
        props.history.push(value);
    };
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton onClick={AppsMenu} value={value} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    <Typography variant="h6">
                    </Typography>
                </IconButton>
                <Typography variant="h6" id="title">
                    {title}
                </Typography>
                <Tabs value={value} onChange={handleCallToRouter}  className={classes.title}>
                    <Tab label="Home" value={tabs.home}/>
                    <Tab label="Apps" value={tabs.apps}/>
                    <Tab label="Roles" value={tabs.roles}/>
                    <Tab label="Users" value={tabs.users}/>
                </Tabs>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;