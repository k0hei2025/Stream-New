import React from 'react';
//import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera } from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { switchForScreenSharingStream, hangUp } from '../../../utils/webRTC/webRTCHandler';
import MicIcon from '@material-ui/icons/Mic';

import MicOff from '@material-ui/icons/MicOff';

import CallEnd from '@material-ui/icons/CallEnd';

import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';

import AlbumIcon from '@material-ui/icons/Album';
import ShareIcon from '@material-ui/icons/Share';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ChatIcon from '@material-ui/icons/Chat';
import PanToolIcon from '@material-ui/icons/PanTool';
import AirplayIcon from '@material-ui/icons/Airplay';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '20%'
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8'
  }
};

const ConversationButtons = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall
  } = props;

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MicIcon/> : <MicOff/>}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <CallEnd/>
      </ConversationButton>}



      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <VideocamIcon/> : <VideocamOffIcon/> }
      </ConversationButton>
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ?  <StopScreenShareIcon/> : <ScreenShareIcon/>}
        
      </ConversationButton>
      
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
         <ShareIcon/>
        
      </ConversationButton>
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>

       <AlbumIcon/>  
      </ConversationButton>
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        <FullscreenIcon/>
      </ConversationButton>
      
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
         <ChatIcon/>
      </ConversationButton>
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
  <PanToolIcon/>
      </ConversationButton>


  <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
  <FolderOpenIcon/>
      </ConversationButton>

        <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
  <AirplayIcon/>
      </ConversationButton>



{/* <AlbumIcon/>
      
        <FullscreenIcon/>
        <ChatIcon/>
        <PanToolIcon/>
        <AirplayIcon/>
        <FolderOpenIcon/> */}


    </div>
  );
};

export default ConversationButtons;
