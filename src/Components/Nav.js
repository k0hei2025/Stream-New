import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import '../App.css';

const NavBar=()=>{

    return (

        <React.Fragment>
        <AppBar elevation={0}>
            <Toolbar>
            <Typography variant="h2" className="logo">Stream</Typography>
            <Typography>
             <Link to='/signup'> 
                            <Button size="medium" color="white">Sign in</Button>
                            
                            <Button size="medium" color="white">Sign up</Button>
                        </Link>
              <Link to='/newcall'>
                    <Button variant="contained" color="white"
                     style={{ color: "rgb(59, 187, 247);" }}>Join</Button>
                 </Link>
                </Typography>
                </Toolbar>
            </AppBar>
            </React.Fragment>
    )
}

export default NavBar;