import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import { Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import ScheduledCalls from "./ScheduledCalls";

const useStyles = makeStyles({
    popup: {
        maxWidth: "sm",
        display: "inline-block",
         justifyContent:"center",
         alignItem:"center"
      }
    });


function ScheduleCall()
{
  const classes = useStyles();
  const [callScheduledCalls, setCallScheduledCalls] = useState(false);
  
  return (
          <div className="scall">
            <form  className={classes.popup}>

              <TextField variant="outlined" fullWidth={true} color="white" type="date" />
              <TextField variant="outlined" fullWidth={true}  color="white" type="time" />
              <TextField variant="outlined" fullWidth={true} color="white" type="text" placeholder="Description" />

              <div className="csh">
                  <Button variant="contained">Copy</Button>
                  <Button variant="contained" onClick={() => {setCallScheduledCalls(true)}}>Schedule</Button>
                  <Button variant="contained">Share</Button>
              </div>
      </form>
      <ScheduledCalls
          callScheduledCalls = {callScheduledCalls}
          setCallScheduledCalls={setCallScheduledCalls}>
        </ScheduledCalls>
          </div>
  );
}


export default ScheduleCall;