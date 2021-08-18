import React, { useRef, useEffect } from 'react';


import screenfull from 'screenfull';



const styles = {
  videoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignContent: "center",
    texAlign: "center",
    margin:"5px"
  },
  videoElement: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
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
