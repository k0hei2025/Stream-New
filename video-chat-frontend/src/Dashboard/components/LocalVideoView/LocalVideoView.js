import React, { useRef, useEffect } from 'react';


import screenfull from 'screenfull';



const styles = {
  videoContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    position: 'absolute',
    top: '5%',
    right: '23%'
  },
  videoElement: {
    width: '100%',
    height: '100%'
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
    <div style={styles.videoContainer} className='background_secondary_color'>
      <video style={styles.videoElement} onClick={fullScreenHandler} ref={localVideoRef} autoPlay muted />
    </div>
  );


};

export default LocalVideoView;
