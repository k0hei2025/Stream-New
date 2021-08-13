import React from 'react';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({

    btn: {
        flex: 1,
        color: "rgb(26, 27, 27)",
        fontFamily: '"Atkinson Hyperlegible", sans-serif'
    }

})


function Nav()
{
    const classes = useStyles();
    return (
        <AppBar elevation={0}>
            <Toolbar>
                <Button href="/" className={classes.btn} ><b>Stream</b></Button>
            <Typography>
                 <Button size="large" color="white" href ="/signup">Sign in</Button>
                            
                 <Button size="large" color="white" href ="/signup">Sign up</Button>
                
                    <Button variant="contained" color="white" href="/newcall"
                     style={{ color: "rgb(59, 187, 247)" }}>Join</Button>
                 
                </Typography>
                </Toolbar>
            </AppBar>
    )
}

export default Nav;