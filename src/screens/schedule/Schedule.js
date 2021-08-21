import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
import scheduleAction from "../../store/actions/scheduleActions";
import { connect } from "react-redux";
>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c

const useStyles = makeStyles({
  popup: {
    maxWidth: "sm",
    display: "inline-block",
    justifyContent: "center",
    alignItem: "center",
  },
});

<<<<<<< HEAD
function ScheduleCall() {
=======
function ScheduleCall({ schedule_info_fun, response }) {
  const [copy, setCopy] = useState();

>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c
  const [values, setValues] = useState({
    date: "",
    time: "",
    description: "",
  });
<<<<<<< HEAD
=======
  const [pageURL, setPageURL] = useState(0);

  useEffect(() => {
    setPageURL(window.location.href);
  }, []);
>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c

  const { date, time, description } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const classes = useStyles();

<<<<<<< HEAD
  return (
    <div className="scall">
      <form className={classes.popup}>
        <TextField
=======
  const onSubmit = async (event) => {
    await event.preventDefault();

    await schedule_info_fun(values);
    await setValues({
      date: "",
      time: "",
      description: "",
    });
  };

  useEffect(() => {
    schedule_info_fun();
  }, []);

  // share

  const copy_details = (e) => {
    e.preventDefault();
    if (values==={}) {
      
    }
    setCopy({
      title: description,
      time: time,
      date: date,
      url: pageURL,
    });
  };

  return (
    <div className="scall">
      <form className={classes.popup}>
      <h1>{}</h1>
        <TextField
          required
>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c
          variant="outlined"
          fullWidth={true}
          color="white"
          type="date"
          value={date}
          onChange={handleChange("date")}
        />
        <TextField
<<<<<<< HEAD
=======
          required={true}
>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c
          variant="outlined"
          fullWidth={true}
          color="white"
          type="time"
          value={time}
          onChange={handleChange("time")}
        />
        <TextField
<<<<<<< HEAD
=======
          required={true}
>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c
          variant="outlined"
          fullWidth={true}
          color="white"
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleChange("description")}
        />

        <div className="csh">
<<<<<<< HEAD
          <Button variant="contained">Copy</Button>
          <Button variant="contained">Schedule</Button>
          <Button variant="contained">Share</Button>
        </div>
      </form>
      <p>{JSON.stringify(values)}</p>
=======
          <Button variant="contained" onClick={copy_details}>
            Copy
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            Schedule
          </Button>
          <Button variant="contained">Share</Button>
        </div>
      </form>
      <p>{JSON.stringify(copy)}</p>
>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c
    </div>
  );
}

<<<<<<< HEAD
export default ScheduleCall;
=======
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
>>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c
