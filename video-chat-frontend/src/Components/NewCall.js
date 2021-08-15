import React, { useState } from "react";
import Nav from "./Nav";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import "./App.css";
// import "./stream-newcall.css";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Popup from "./Popup";
import ScheduleCall from "../screens/schedule/Schedule";
const useStyles = makeStyles({
  cntnr: {
    maxWidth: "sm",
    display: "flex",
    flexDirection: "column",
    float: "right",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
    top: -300,
  },
  callcomponents: {
    background: "#fefefe",
    borderRadius: 10,
    boxShadow: "solid",
    maxWidth: "sm",
    color: "primary",
    fontFamily: "Roboto",
    fontWeight: 500,
    padding: 20,
    margin: 10,
  },
});

function NewCall() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Container>
      <Nav />
      <div className="desc">
        <Typography variant="h2">Pick name.</Typography>
        <Typography variant="h2">Share URL.</Typography>
        <Typography variant="h2">Start conference.</Typography>
        <Typography variant="subtitle1" style={{ color: "rgb(209, 203, 203)" }}>
          Each room has its own disposable URL.
          <br /> Just pick a room name and share your custom URL.
          <br /> It's really that easy !
        </Typography>
      </div>

      <div className={classes.cntnr}>
        <div className="twobox">
          <Container className={classes.callcomponents}>
            <Typography variant="h4" style={{ color: "#314eaf" }}>
              Hey !! <br />
              Start a Meeting{" "}
            </Typography>
            <Typography variant="subtitle1" style={{ color: "#6b8cfb" }}>
              Here's a Room Name{" "}
            </Typography>
            <TextField
              variant="outlined"
              fullWidth={true}
              color="primary"
            ></TextField>{" "}
            <br />
            <TextField
              variant="outlined"
              fullWidth={true}
              placeholder="Description"
            ></TextField>
            <div className="csh">
              <Button
                variant="contained"
                style={{ background: "#6b8cfb", color: "rgb(4, 81, 133)" }}
              >
                Copy
              </Button>
              <Button
                variant="contained"
                style={{ background: "#6b8cfb", color: "rgb(4, 81, 133)" }}
              >
                Share
              </Button>
              <Button
                variant="contained"
                style={{ background: "#6b8cfb", color: "rgb(4, 81, 133)" }}
              >
                Host
              </Button>
            </div>
          </Container>
          <Container className={classes.callcomponents}>
            <Typography variant="h4" style={{ color: "#314eaf" }}>
              Schedule Events
            </Typography>
          </Container>
        </div>
        <Button
          className={classes.callcomponents}
          maxWidth="sm"
          variant="contained"
          onClick={() => setOpenPopup(true)}
          style={{ height: 80 }}
        >
          Schedule Call
        </Button>
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <ScheduleCall />
        </Popup>
      </div>
    </Container>
  );
}

export default NewCall;
