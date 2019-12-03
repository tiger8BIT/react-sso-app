import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AppTable extends React.Component {
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
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
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
                <Paper className="root">
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">Url</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell align="right">{item.id}</TableCell>
                                    <TableCell align="right">{item.url}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
    }
}
export default AppTable;