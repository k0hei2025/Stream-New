import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '200%',
    height: '100%',
    justifyContent: "stretch",
    margin: "0px",
    borderRadius:"10px"
  },
  videoElement: {
    width: '100%',
    height: '100%',
    borderRadius: "10px",
    justifyContent: "stretch",

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
