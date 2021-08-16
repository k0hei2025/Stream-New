import React, { useEffect , useState} from 'react';
import { IoVideocamSharp } from 'react-icons/io5';
import { RiVideoAddFill } from 'react-icons/ri';
import { BiCalendarEvent } from 'react-icons/bi';
import { MdScreenShare } from 'react-icons/md';
/*import { FiCopy, FiShare } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';*/
import ScheduledCalls from './ScheduledCalls';
import { Link } from 'react-router-dom';
import './Newcall.css';

function NewCall()
{

    const [time , setTime] = useState([])


//     useEffect(()=>
// {
//     DisplayCurrentTime();
//     },[]);
    

// function DisplayCurrentTime()
// {
//     var date = new Date();
//     var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
//     var am_pm = date.getHours() >= 12 ? "PM" : "AM";
//     hours = hours < 10 ? "0" + hours : hours;
//     var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//     var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//     var time = [hours, minutes, seconds, am_pm];
//     let times = [];
//     for (let i = 0; i < time.length; i++)
//     {
//         Array.prototype.push.apply(times, time[i].split(""));
//         console.log(  ` in the loop ${times} `);
//          setTime(times)
//         }
//         console.log(times);

// }


    return (
        <div className="new-call">
            <div className="samay">
                <div className="time" >
                    <div className="hr-min">1</div>
                    <div className="hr-min">1</div>
                    <h1 className="colon">:</h1>
                    <div className="hr-min">1</div>
                    <div className="hr-min">1</div>
                    </div>
                <div className="sec_am-pm">
                    <div className="sec">2</div>
                    <div className="sec">3</div>
                    <div className="sec">A</div>
                    <div className="sec">M</div>
                </div>
            </div>
            <div className=" new-call diff ">
                <div className="call-options">
                    <Link to="/join" className="callLinks">
                        <figure>
                            <IoVideocamSharp className="call-icons" />
                            <figcaption>Host</figcaption>
                        </figure>
                    </Link>
                    <Link to="/join" className="callLinks">
                        <figure>
                            <RiVideoAddFill className="call-icons" />
                            <figcaption>Join</figcaption>
                        </figure>
                    </Link>
                    <Link to="/" className="callLinks">
                        <figure>
                            <MdScreenShare className="call-icons" />
                            <figcaption>Share Screen</figcaption>
                        </figure>
                    </Link>
                    <button className="callLinks" id="sch">
                        <figure>
                            <BiCalendarEvent className="call-icons "  />
                            <figcaption>Schedule</figcaption>
                        </figure>
                    </button>
                </div>
                
            </div>
            <div className="call-list">
                    <h1 id="sc-head">Up-coming Meetings</h1>
                    <ScheduledCalls />
                  
                </div>
        </div>
    )
}

export default NewCall
