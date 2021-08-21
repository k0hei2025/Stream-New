import React from 'react';
import { connect } from 'react-redux';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { callStates, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../store/actions/callActions';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
import { IoCreateSharp } from 'react-icons/io5';
import { IoRemoveOutline } from 'react-icons/io5';

const GroupCall = (props) => {
  // eslint-disable-next-line
  const { callState, localStream, groupCallActive, groupCallStreams } = props;

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };
 
  return (
    <>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS &&
        <GroupCallButton onClickHandler={createRoom} label={<IoCreateSharp />} />}
      {groupCallActive && <GroupCallRoom {...props} />}

      {groupCallActive && <GroupCallButton onClickHandler={leaveRoom} label={<IoRemoveOutline style={{color: "rgb(250, 20, 20)"}} />} />}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call
});

const mapActionsToProps = (dispatch) => {
  return {
    setCameraEnabled: enabled => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: enabled => dispatch(setLocalMicrophoneEnabled(enabled))

  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);
