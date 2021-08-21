import React, { useRef, useEffect } from 'react';


import screenfull from 'screenfull';



const styles = {
  videoContainer: {
    width: '650px',
    height: '484px',
    justifyContent: "center",
    alignContent: "center",
    alignItem:"center",
    padding: "0px",
    borderRadius:"20px"
  },
  videoElement: {
    width: '650px',
    height: '100%',
    borderRadius: '20px'
  }
};

  
const fullScreenHandler=()=>{
let vid = document.querySelector('video');
    console.log('click')
     if (screenfull.isEnabled){
       screenfull.toggle(vid)
     }
   
}
   




const LocalVideoView = props => {
  const { localStream } = props;
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);
 

  
  return (
    <div style={styles.videoContainer} >
      <video style={styles.videoElement} onClick={fullScreenHandler} ref={localVideoRef} autoPlay muted />
    </div>
  );


};

export default LocalVideoView;
