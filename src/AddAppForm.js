import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

const styles = theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'start',
        backgroundColor: 'azure',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    fieldsDiv: {
        flexGrow: 1,
    },
})

class AddAppForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            urlErrorText: '',
            newApp: {
                name: '',
                url: '',
            },
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
    }

    handleUrl(e) {
        let value = e.target.value;
        if(value.match(regex)) {
            this.setState({urlErrorText: ''})
            this.setState(
                prevState => ({
                    newApp: {
                        ...prevState.newApp,
                        url: value
                    }
                }),
            );
        }
        else {
            this.setState({ urlErrorText: 'Invalid URL' })
        }
    }

    handleName(e) {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newApp: {
                    ...prevState.newApp,
                    name: value
                }
            }),
        );
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
                console.log(result);
                var res = result;
                res += 1;
                console.log(res);
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
            <form onSubmit={this.handleFormSubmit}
                          className={classes.container} noValidate autoComplete="off">
            <div className={classes.fieldsDiv}>
                <TextField
                    id="standard-password-input"
                    label="Name"
                    className={classes.textField}
                    onChange={this.handleName}
                    type="text"
                    margin="normal"
                />
                <TextField
                    error={this.state.urlErrorText !== ''}
                    id="standard-password-input"
                    label="Url"
                    className={classes.textField}
                    onChange={this.handleUrl}
                    helperText = {this.state.urlErrorText}
                    type="text"
                    margin="normal"
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                disabled={this.state.urlErrorText  !== '' ||
                this.state.newApp.url  === '' ||
                this.state.newApp.name  === ''}
            >
                Add
            </Button>
        </form>
        );
    }
}
export default withStyles(styles)(AddAppForm);