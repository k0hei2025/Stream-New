import React, { useEffect, useState } from 'react'
import './Newcall.css'
import { FiCopy, FiShare } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from './Button';

import { useSelector } from 'react-redux'


function ScheduledCalls(props) {

    const { children, callScheduledCalls, setCallScheduledCalls } = props;

    const [packet, setPacket] = useState([]);

    const [returnDate, setReturnDate] = useState([]);
    const token = useSelector((state) => state.majorStore.tokenId);


    useEffect(() => {



        console.log("token of state ", token)


        const fireData = async () => {

            let dataToArray = [];


            const data = await fetch('https://stream-new-2142d-default-rtdb.firebaseio.com/schedule.json?auth=' + token);
            const resData = await data.json();


            if (token) {

                for (let key in resData) {
                    dataToArray.push({
                        id: key,
                        link: resData[key].data.link,
                        date: resData[key].data.date,
                        time: resData[key].data.time,
                        description: resData[key].data.description
                    })
                    console.log(dataToArray)

                }
                setPacket(dataToArray);
            }







            return resData;
        }
        fireData();

    }, [])


    useEffect(() => {

        console.log('packet Length', packet.length)

        if (!token) {

            setReturnDate(<h1> No schedule meetings Yet</h1>)
            console.log('if conidition called', packet)



        }



        if (token) {

            console.log('else condition called', packet)

            setReturnDate(


                packet.map((i) => {

                    return (
                        <div open={callScheduledCalls} >
                            <div className="due-meet" id={i.id} >
                                <div className="descr">

                                    <h6>Subject :{i.description}</h6>
                                    <h6>Date :{i.date}</h6>
                                    <h6>Time :{i.time}</h6>
                                    <h6>URL : {i.link}</h6>
                                </div>
                                <div className="start-button">
                                    <Button buttonColor="blue" buttonStyle="outline" >Start</Button>
                                </div>
                                <div className="func-icons">
                                    <FiCopy style={{ marginRight: "10px" }} />
                                    <FiShare style={{ marginRight: "10px" }} />
                                    <AiOutlineDelete style={{ marginRight: "10px" }} />
                                </div>


                            </div>

                        </div>
                    )

                })
            )

            console.log("returnDate", returnDate)

        }





    }, [])







    return (


        packet.map((i) => {

            return (
                <div open={callScheduledCalls} >


                    <div className="due-meet" id={i.id} >
                        <div className="descr">
                            <h6>Subject :{i.description}</h6>
                            <h6>Date :{i.date}</h6>
                            <h6>Time :{i.time}</h6>
                        </div>

                        <div className="start-button">
                            <button id="strt" onClick={() => {
                                window.location.href = i.link;
                            }} >Start</button>
                        </div>
                        <div className="func-icons">
                            <FiCopy style={{ marginRight: "10px" }} />
                            <FiShare style={{ marginRight: "10px" }} />
                            <AiOutlineDelete style={{ marginRight: "10px" }} />
                        </div>


                    </div>

                </div>
            )

        })

    )









}






export default ScheduledCalls
