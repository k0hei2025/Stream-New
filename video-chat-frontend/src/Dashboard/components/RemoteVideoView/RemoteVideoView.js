import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    display: 'block',
    marginRight: 'auto',
    marginLeft:'auto',
    width: '650px',
    height: '484px',
    justifyContent: "center",
    alignContent: "center",
    alignItem:"center",
    margin: "0px",
    padding: "0px",
    borderRadius:"20px"
  },
  videoElement: {
    width: '650px',
    height: '100%',
    borderRadius: '20px',

  }
};
 
const LocalVideoView = props => {
  const { remoteStream } = props;
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default LocalVideoView;
