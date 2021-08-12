import '../App.css';
import React from 'react';
import {  Link } from 'react-router-dom';
import style from './stream-homepage.css';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import  Button  from '@material-ui/core/Button';

const Home = () =>
{
  return (
    <div className={style.bg}>
      <Typography variant="h2">Meet it out</Typography>
      <Typography variant="subtitle1">with <b>Stream </b> </Typography>
      <Container maxWidth="sm"
        style={{
          justifyContent: "center", alignItems: "center"
        }}>
        <div className="imag">
          <img src="../Image/laptop.jpg" alt="" />
          <img src="../Image/mobile.png" alt="" />
        </div>
            
        <div className="buttons">
          <Button variant="contained" color="rgb(59, 187, 247)">Join a Meeting</Button>
          <Link to="/newcall">
            <Button variant="contained" color="rgb(59, 187, 247)">Create a Meeting</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;