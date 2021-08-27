import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import ScheduledCalls from "./ScheduledCalls";
import { linkUrl } from '../Home'

import { useSelector } from "react-redux";
import { v4 as uuidV4 } from 'uuid';



const useStyles = makeStyles({
  popup: {
    maxWidth: "sm",
    display: "inline-block",
    justifyContent: "center",
    alignItem: "center"
  }
});


function ScheduleCall() {
  const date = useRef();
  const time = useRef();
  const description = useRef();


  const token = useSelector((state) => state.majorStore.tokenId);


  const classes = useStyles();
  const [callScheduledCalls, setCallScheduledCalls] = useState(false);

  const copier = () => {


  }

  const submitHandler = async (event) => {

    event.preventDefault();

    const dateRef = date.current.value;
    const timeRef = time.current.value;
    const descriptionRef = description.current.value;

    const id = uuidV4();

    const preparedLink = "https://streeam-new.herokuapp.com/join/" + id;

    console.log(preparedLink);


    const packet = {
      date: dateRef,
      time: timeRef,

      description: descriptionRef,
      link: preparedLink

    }


    const datas = await fetch('https://stream-new-2142d-default-rtdb.firebaseio.com/schedule.json?auth=' + token, {

      method: 'POST',
      body: JSON.stringify({
        data: packet,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }

    });

    const resData = await datas.json();
    console.log(resData)


    setCallScheduledCalls(true)
  }



  return (
    <div className="scall">
      <form className={classes.popup}>

        <input type="date" ref={date} />
        <input type="time" ref={time} />
        <input type="text" placeholder="Description" ref={description} />




        <div className="csh">
          <Button variant="contained" onClick={copier}>Copy</Button>
          <Button variant="contained" onClick={submitHandler}>Schedule</Button>
          <Button variant="contained">Share</Button>
        </div>
      </form>


      <ScheduledCalls
        callScheduledCalls={callScheduledCalls}
        setCallScheduledCalls={setCallScheduledCalls}>

      </ScheduledCalls>


    </div>
  );
}


export default ScheduleCall;