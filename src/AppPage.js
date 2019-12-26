import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
var timeout = null;

const styles = theme => ({
    fullWidth: {
        flexGrow: 1,
        maxWidth: "100%",
        padding: 0,
    },
    title: {
        flexGrow: 1,
        maxWidth: "100%",
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-between",
        backgroundColor: "snow",
        padding: "10px 20px",
    },
    updateAppResult: {
        fontSize: 20,
        backgroundColor: "lightgreen",
        flexGrow: 1,
        display: "flex",
        paddingLeft: 10,
    }
});

class AppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlErrorText: '',
            error: null,
            isLoaded: false,
            name: '',
            url: '',
            item: {name: null, url: null}
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
    }

    componentDidMount() {
        let url = "http://localhost:8080/sso/update/app?id=" + this.props.appId;
        fetch(url, {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        item: result
                    });
                    document.getElementById("input-url").value = this.state.item.url;
                    document.getElementById("input-name").value = this.state.item.name;
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    handleUrl(e) {
        clearTimeout(timeout);
        document.getElementById("update-app-result").style="display:none";
        let value = e.target.value;
        if(value.match(regex)) {
            this.setState({urlErrorText: ''});
            this.state.item.url = value;
            clearTimeout(timeout);
            timeout = setTimeout(this.updateRequest, 700);
        }
        else {
            this.setState({ urlErrorText: 'Invalid URL' });
        }
    }

    handleName(e) {
        clearTimeout(timeout);
        document.getElementById("update-app-result").style="display:none";
        if(this.state.urlErrorText === '') {
            let value = e.target.value;
            this.state.item.name = value;
            timeout = setTimeout(this.updateRequest, 700);
        }
    }

    updateRequest(e) {
        fetch("http://localhost:8080/sso/update/app", {
            crossDomain:true,
            method: "POST",
            body: JSON.stringify(this.state.item),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (result) => {
                document.getElementById("update-app-result").style="display:flex";
            },
            (error) => {
                console.log(error);
            }
        )
    }

    handleFormSubmit(e) {
        console.log("hellow");
        e.preventDefault();
        let appData = this.state.newApp;
        console.log(JSON.stringify(appData));
        fetch("http://localhost:8080/sso/add/app", {
            crossDomain:true,
            method: "POST",
            body: JSON.stringify(appData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (result) => {
            },
            (error) => {
                console.log(error);
            }
        )
    }
    handleClearForm() {

    }
    render() {
        const { classes } = this.props;
        return (
            <Container className={`${classes.fullWidth} `}>
                <Typography variant="overline" className={classes.updateAppResult} id="update-app-result" style={{display: "none"}}>Обновлено</Typography>
                <Box>
                    <div className={`${classes.fullWidth}, ${classes.title} `}>
                        <TextField
                            inputProps={{
                                style: {fontSize: 30, height: 40}
                            }}
                            InputLabelProps={{
                                style: {fontSize: 30}
                            }}
                            className={classes.textField}
                            onChange={this.handleName}
                            type="text"
                            id="input-name"
                            margin="normal"
                            placeholder="Name"
                        />
                        <TextField
                            inputProps={{
                                style: {fontSize: 30, height: 40}
                            }}
                            InputLabelProps={{
                                style: {fontSize: 30}
                            }}
                            id="input-url"
                            error={this.state.urlErrorText !== ''}
                            className={classes.textField}
                            onChange={this.handleUrl}
                            helperText = {this.state.urlErrorText}
                            type="text"
                            margin="normal"
                            placeholder="Url"
                        />
                    </div>
                </Box>
            </Container>
        );
    }
}
export default withStyles(styles)(AppPage);