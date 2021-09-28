

import React, { useState, useEffect } from 'react';



import { IoVideocamSharp } from 'react-icons/io5';
import { RiVideoAddFill } from 'react-icons/ri';
import { BiCalendarEvent } from 'react-icons/bi';
import { MdScreenShare } from 'react-icons/md';
import ScheduledCalls from './ScheduledCalls';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './Newcall.css';
import Popup from './Popup';
import ScheduleCall from "./ScheduleCall";
import JoinPopup from './pages/joinPopup'



function NewCall() {

    const [time, setTime] = useState([]);
    const [popups, setPopup] = useState(false);
    useEffect(() => {

        setInterval(
            DisplayCurrentTime, 1000
        )
    }, []);

    const popupHandler = () => {
        setPopup(!popups)
        console.log(popups, 'by newcall js file')
    }


    function DisplayCurrentTime() {
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        var time = [hours, minutes, seconds, am_pm];

        let times = [];
        for (let i = 0; i < time.length; i++) {
            let t = time[i].toString();
            let arr = t.split("");
            Array.prototype.push.apply(times, arr);
        }

        setTime(times);

    };

    const [openPopup, setOpenPopup] = useState(false);


    return (
        <>



            {popups ? <JoinPopup closedByNewCall={popups} /> : null}

            <Navbar sign={true} />

            <div className="new-call" style={{ overflowY: 'hidden' }}>
                <div className="samay">
                    <div className="time" >
                        <div className="hr-min"><hr class="line" />{time[0]}</div>
                        <div className="hr-min"><hr class="line" />{time[1]}</div>
                        <h1 className="colon">:</h1>
                        <div className="hr-min"><hr class="line" />{time[2]}</div>
                        <div className="hr-min"><hr class="line" />{time[3]}</div>
                    </div>

                    <div className="sec_am-pm">
                        <div className="sec">{time[4]}</div>
                        <div className="sec">{time[5]}</div>
                        <div className="sec">{time[6]}</div>
                        <div className="sec">{time[7]}</div>
                    </div>
                </div>




                <div style={{ marginTop: "20vh" }} className=" new-call diff ">
                    <div className="call-options" >
                        <Link to="/join" className="callLinks">
                            <figure className="fig-icon">
                                <IoVideocamSharp className="call-icons" />
                                <figcaption className="fig-cap">Host</figcaption>
                            </figure>
                        </Link>

                        <div className="callLinks">
                            <figure className="fig-icon" onClick={popupHandler}>
                                <RiVideoAddFill className="call-icons" />
                                <figcaption className="fig-cap">Join</figcaption>
                            </figure>
                        </div>

                        <div className="callLinks">

                            <figure className="fig-icon">
                                <MdScreenShare className="call-icons" />
                                <figcaption className="fig-cap">Share Screen</figcaption>
                            </figure>
                        </div>

                        <button className="callLinks" id="sch" onClick={() => setOpenPopup(true)}>
                            <figure className="fig-icon">
                                <BiCalendarEvent className="call-icons " />
                                <figcaption className="fig-cap">Schedule</figcaption>
                            </figure>
                        </button>
                    </div>

                </div>
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}>

                    <ScheduleCall />
                </Popup>
                <div className="call-list">
                    <h2 id="sc-head">Up-Coming Meetings</h2>
                    {<ScheduledCalls />}

                </div>
                <div style={{ height: "20px" }}></div>
            </div>

        </>

    )
}

export default NewCall
