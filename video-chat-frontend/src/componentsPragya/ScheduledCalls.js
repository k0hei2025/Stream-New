import React from 'react'
import './Newcall.css'
import { FiCopy, FiShare } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from './Button';

function ScheduledCalls(props) {

    const {  children, callScheduledCalls, setCallScheduledCalls } = props;

    return (
        <div open={callScheduledCalls}>
            <div className="due-meet" >
                <div className="descr">
                <h3>Subject :</h3>                
                <h3>Date :</h3>
                    <h3>Time :</h3>
                </div>
                <div className="start-button">
                    <Button buttonColor="blue" buttonStyle="outline" >Start</Button>
                </div>
                <div className="func-icons">
                    <FiCopy style={{ marginRight: "10px" }} />
                    <FiShare style={{ marginRight: "10px" }} />
                    <AiOutlineDelete style={{ marginRight: "10px" }}/>
                </div>

                
            </div>
            
        </div>
    )
}

export default ScheduledCalls
