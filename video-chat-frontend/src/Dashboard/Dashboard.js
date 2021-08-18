import React, { useEffect } from 'react';
import logo from '../resources/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/Dashboardinformation/Dashboardinformation';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';
import './Dashboard.css';
import { IoVideocam } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FiCopy, FiShare } from 'react-icons/fi';

const Dashboard = ({ username, callState }) => {
  useEffect(() => {
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);

  return (
    <div className='dashboard_container background_main_color'>
      <div className='dashboard_left_section '>
        <div className="meet-name">
          <Link to="/" className=" stream-logo"><IoVideocam className="navbar-icon" />STREAM</Link>
          <div className="meet-desc" placeholder="Meeting Subject/Title">
            <div className="copy-share">
              <button className="copy-share-button"><FiCopy /></button>
              <button className="copy-share-button"><FiShare /></button>
            </div>
          </div>
        </div>
        <div className="video">
          <div className='dashboard_rooms_container '>
              <GroupCallRoomsList />
          </div>

          <div className='dashboard_content_container'>
              <DirectCall />
              <GroupCall />  
              {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
          </div>          
          
          <div className='dashboard_active_users_list'>
            <ActiveUsersList />
            </div>
          
        </div>
      </div>
      <div className="chat-application">
        <div className="chatter"> 
          <button className="chat-button">Chat</button>
          </div>
      </div>
    </div>
    
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(Dashboard);
