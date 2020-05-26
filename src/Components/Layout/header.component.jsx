import React from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
        title: {
        marginTop: theme.spacing(3),
        }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6">
                    Rapid Skillz
                </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="h3" gutterBottom={true} className={classes.title}>
                Escape Information Overload!
            </Typography>
            <Typography variant="body1">
                Figure out the fastest path to mastering critical skills
            </Typography>
        </div>
    );
}