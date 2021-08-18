

import React, { useState } from 'react';

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
    flexWrap: 'wrap',
    width: '54%',
    
    justifyContent: "center",
    padding: '20px 2px ',
    alignItem:'center',
    position: 'absolute', 
    bottom: '-40%',
    borderRadius: "15px",
    backgroundColor: 'rgb(196, 192, 192)',
    marginTop:"25px",
    left: '25%'



  },
  icon: {
    backgroundColor: '#fff',
    width: '25px',
    height: '25px',
    fontSize:'35px',
    borderRadius: '50%',
    fill: '#0548ff'
  }
};

const ConversationButtons = (props) => {


  const [ record , setRecord ] = useState(true);
  const [mediaState , setMediaState] = useState({});
  const [fullScreen , setFullScreen] = useState(false)


  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall
  } = props;

  const fullScreenHandler=()=>{
    setFullScreen(!fullScreen)
    console.log(fullScreen)

  
  }

  const recordHandler=()=>{
  
    setRecord(!record);
    console.log(record);

    

    let parts = [];
    let mediaRecord;
    navigator.mediaDevices.getUserMedia({
      audio: true,video: true
    }).then((stream)=>{

      localStream.srcObject = stream;
      

         mediaRecord =  new MediaRecorder(stream);
     if (record){
       
     mediaRecord.start(1000);
     setMediaState(mediaRecord)
     console.log(mediaRecord);
     mediaRecord.ondataavailable =(e)=>{
       parts.push(e.data);
     }

    }

        if (!record){
      mediaState.stop();
      const blob  = new Blob(parts, {
        type:"video/webm"
      })
      const url = URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "test.webm";
      a.click();
    }

      })
      
  



  }


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

        {localMicrophoneEnabled ? <MicIcon style={styles.icon} /> : <MicOff style={styles.icon}/>}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <CallEnd style={styles.icon}/>
      </ConversationButton>}



      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <VideocamIcon style={styles.icon}/> : <VideocamOffIcon style={styles.icon}/> }
      </ConversationButton>
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ?  <StopScreenShareIcon style={styles.icon}/> : <ScreenShareIcon style={styles.icon}/>}
        
      </ConversationButton>
      
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
         <ShareIcon style={styles.icon} />
        
      </ConversationButton>
       <ConversationButton onClickHandler={recordHandler}  >

       <AlbumIcon style={styles.icon}/>  
      </ConversationButton>
       <ConversationButton onClickHandler={fullScreenHandler}>
        <FullscreenIcon style={styles.icon}/>
      </ConversationButton>
      
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
         <ChatIcon style={styles.icon}/>
      </ConversationButton>
       <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
  <PanToolIcon style={styles.icon}/>
      </ConversationButton>


  <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
  <FolderOpenIcon style={styles.icon}/>
      </ConversationButton>

        <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
  <AirplayIcon style={styles.icon}/>
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
