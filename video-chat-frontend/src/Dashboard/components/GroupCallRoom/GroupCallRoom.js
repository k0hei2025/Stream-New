import React from 'react';
import ConversationButtons from '../ConversationButtons/ConversationButtons';

import './GroupCallRoom.css';
import GroupCallVideo from './GroupCallVideo';

import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import { callStates } from '../../../store/actions/callActions';

const GroupCallRoom = (props) => {

  const {remoteStream , callState} = props


  const { groupCallStreams } = props;
  return (
    <div className='group_call_room_container'>
      <span className='group_call_title'>Group Call</span>
      <div className='group_call_videos_container'>
        {
          groupCallStreams.map(stream => {
            return <GroupCallVideo key={stream.id} stream={stream} />;

         
          })
        }

         {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
      </div>
      <ConversationButtons {...props} groupCall />





    </div>
  );
};

export default GroupCallRoom;
