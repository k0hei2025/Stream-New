import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import scheduleAction from "../../store/actions/scheduleActions";
import { connect } from "react-redux";
import axios from "axios";

const useStyles = makeStyles({
  popup: {
    maxWidth: "sm",
    display: "inline-block",
    justifyContent: "center",
    alignItem: "center",
  },
});

function ScheduleCall({ schedule_info_fun, response }) {
  // const [copy, setCopy] = useState();

  const [values, setValues] = useState({
    date: "",
    time: "",
    description: "",
  });
  const [pageURL, setPageURL] = useState(0);

  useEffect(() => {
    setPageURL(window.location.href);
  }, []);

  const { date, time, description } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const classes = useStyles();
  const checker = () => {
    if (values === {}) {
      return "Empty value will not consider";
    } else {
      setValues({
        date: "",
        time: "",
        description: "",
      });
    }
  };
  const onSubmit = async (event) => {
    await event.preventDefault();

    await schedule_info_fun(values);
    await checker();
  };

  useEffect(() => {
    schedule_info_fun();
    
    
  }, []);

  // share

  return (
    <div className="scall">
      <form className={classes.popup}>
        <h1>{}</h1>
        <TextField
          required
          variant="outlined"
          fullWidth={true}
          color="white"
          type="date"
          value={date}
          onChange={handleChange("date")}
        />
        <TextField
          required={true}
          variant="outlined"
          fullWidth={true}
          color="white"
          type="time"
          value={time}
          onChange={handleChange("time")}
        />
        <TextField
          required={true}
          variant="outlined"
          fullWidth={true}
          color="white"
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleChange("description")}
        />

        <div className="csh">
          {/* <Button variant="contained" onClick={copy_details}>
            Copy
          </Button> */}
          <Button variant="contained" onClick={onSubmit}>
            Schedule
          </Button>
          {/* <Button variant="contained">Share</Button> */}
        </div>
      </form>
      <p>{JSON.stringify(values)}</p>
    </div>
  );
}

const recive = (state) => {
  console.log("This is SCHEDULE RESPONSE ", state.schedule_res);
  return {
    response: state.schedule_res,
  };
};
// dispatch
const send = (dispatch) => {
  return {
    schedule_info_fun: (obj) => {
      dispatch(scheduleAction(obj));
    },
  };
};

export default connect(recive, send)(ScheduleCall);
