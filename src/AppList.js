import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReactDOM from "react-dom";
import NavBar from "./NavBar";
import AddApp from "./AddApp";

const useStylesL = makeStyles(theme => ({
    menuList: {
        paddingLeft: 30,
    },
}));

function addAppEvent(e) {
    e.preventDefault();
    document.getElementById('title').innerHTML="New App adding";
    ReactDOM.render(<AddApp/>, document.getElementById('content'));
}

class AppList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:8080/sso/search", {
            crossDomain:true,
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Apps
                        </ListSubheader>
                    }
                >
                    <ListItem button onClick={addAppEvent}>
                        <ListItemIcon>
                            <AddCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add new app" />
                    </ListItem>
                    {items.map(item => (
                        <ListItem button key={item.id}>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                    ))}
                </List>
                /*<MenuList>
                    <MenuItem onClick={addAppEvent}>
                        <AddCircleIcon fontSize="small"/>
                        <Typography noWrap>Add New App</Typography>
                    </MenuItem>
                    {items.map(item => (
                        <MenuItem key={item.id}>
                            <Typography noWrap>{item.name}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>*/
            );
        }
    }
}
export default AppList;