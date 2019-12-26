import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReactDOM from "react-dom";
import AddAppForm from "./AddAppForm";
import {history} from "./App";
import AppPage from "./AppPage";

const styles = theme => ({
    menuList: {
        paddingLeft: 30,
    },
    listSubheader: {
        backgroundColor: '#E5E5E5',
        color: '#252525'
        /* To change the font, use the fontFamily rule */
    },
});

function updateAppEvent(id) {
    console.log(id);
}

class AppList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this._handleTouchTap = this._handleTouchTap.bind(this);
        this._addAppEvent = this._addAppEvent.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    _handleTouchTap(e, id) {
        this.props.setAppId(id);
        this.props.goTo('/update/app');
        this.props.setAppListItem(e.target);
    };

    _addAppEvent() {
        return () => {
            this.props.goTo('/add/app');
        }
    };

    sendData = () => {
        this.props.parentCallback("Hey Popsie, How’s it going?");
    };

    componentDidMount() {
        fetch("http://localhost:8080/sso/apps", {
            crossDomain:true,
            method: 'GET',
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
        const { classes } = this.props;
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if(this.state.isLoaded)
            return (
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <p style={{backgroundColor: "white"}}>Apps</p>
                        </ListSubheader>
                    }
                >
                    <ListItem button onClick={this._addAppEvent()}>
                        <ListItemIcon>
                            <AddCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add new app" />
                    </ListItem>
                    {items.map(item => (
                        <ListItem button key={item.id} onClick={(event) => this._handleTouchTap(event, item.id)}>
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
            else
                return (
                    <div>Ошибка загрузки</div>
                );
        }
    }
}
export default withStyles(styles)(AppList);