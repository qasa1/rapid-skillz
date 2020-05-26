import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
 




export default class SimpleTable extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            rows: []
        }
    }

    componentDidMount() {
        this.populateRows(this.props.data, this.props.times);
        console.log("here", this.rows);
    }

    componentWillUnmount() {
        this.resetComponent();
    }

    resetComponent = () => {
        this.setState({
            rows: []
        })
    }



    createData = (task, hours) => {
        return {task , hours};
    }

    populateRows = (data, times) => {
        let total = 0;
        let row;
        let result = [];

        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            if (i === data.length - 1) {
                row = this.createData(item[0], total);
            }else {
                total += times[item[0]];
                row = this.createData(item[0], times[item[0]]);
            }

            result.push(row);
        }

        this.setState({
            rows: result
        })
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item>
                    <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell variant="head">Step</TableCell>
                            <TableCell align="right" variant="head">Number of Hours</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.rows.map((row) => (
                            <TableRow key={row.task}>
                            <TableCell component="th" scope="row">
                                {row.task}
                            </TableCell>
                            <TableCell align="right">{row.hours}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        );
    }

}