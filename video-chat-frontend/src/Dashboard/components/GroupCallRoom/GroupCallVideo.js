import React, { useRef, useEffect } from 'react';

import screenfull from 'screenfull';



const styles = {
  videoContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    marginTop: '0px'
  },
  videoElement: {
    width: '100%',
    borderRadius: '8px',
    height: '100%'
  }


};

const GroupCallVideo = ({ stream }) => {





  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);



 const fullScreenHandler=()=>{
let vid = document.querySelector('video');
    console.log('click')
     if (screenfull.isEnabled){
       screenfull.toggle(vid)
     }
   
}

  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement} onClick={fullScreenHandler} />


    </div>
  );
};

export default GroupCallVideo;









