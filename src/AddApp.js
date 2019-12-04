import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
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
}));

function AddApp() {
    const classes = useStyles();
    return (
        <form action="action_page.php" method="post"
              className={classes.container} noValidate autoComplete="off">
                <div className={classes.fieldsDiv}>
                <TextField
                    id="standard-password-input"
                    label="Name"
                    className={classes.textField}
                    type="text"
                    margin="normal"
                />
                <TextField
                    id="standard-password-input"
                    label="Url"
                    className={classes.textField}
                    type="text"
                    margin="normal"
                />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                    Add
                </Button>
        </form>
    )
}

export default AddApp;