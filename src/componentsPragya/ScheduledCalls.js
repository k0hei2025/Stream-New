import React, { useEffect, useState } from 'react'
import './Newcall.css'
import { FiCopy, FiShare } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from './Button';

function ScheduledCalls(props) {

    const { children, callScheduledCalls, setCallScheduledCalls } = props;

    const [packet, setPacket] = useState([]);

    useEffect(() => {

        const fireData = async () => {

            let dataToArray = [];

            const data = await fetch(`https://stream-new-2142d-default-rtdb.firebaseio.com/schedule.json`);
            const resData = await data.json();


            for (let key in resData) {
                dataToArray.push({
                    id: key,
                    date: resData[key].data.date,
                    time: resData[key].data.time,
                    description: resData[key].data.description
                })
                console.log(dataToArray)
            }


            setPacket(dataToArray);


            return resData;
        }
        fireData();

    }, [])




    let returnDate = (

        packet.map((i) => {

            return (
                <div open={callScheduledCalls} >
                    <div className="due-meet" id={i.id} >
                        <div className="descr">
                            <h3>Subject :{i.description}</h3>
                            <h3>Date :{i.date}</h3>
                            <h3>Time :{i.time}</h3>
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


    console.log("sdljkfghfasduhjgfewsdoihgfaqdophgnwjetop'kehawjts")






    return (
        returnDate

    )





}




export default ScheduledCalls
