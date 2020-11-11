import React, { useState } from 'react';
import { connect } from 'dva';
import RoleInformation from '@/components/RoleInformation';
import Animation from './Animation';
import InputKeyBoard from '@/components/InputKeyBoard';
import ChatRoom from '@/components/ChatRoom';
const UserLayout = props => {
  const { dispatch, wsData, scene, route } = props;
  const [value, setValue] = useState("");
  const upFormData = (event) => {
    dispatch({
      type: 'login/upFormData', params: {
        tradeCode: value,
        playType: route.type,
      }
    })
    event.stopPropagation()
  }

  const sceneFuc = () => <Animation />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {sceneFuc()}
      <RoleInformation />
      <ChatRoom route={route} />
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <InputKeyBoard keyState={'slot'} onChange={(res) => setValue(res)} value={value} onClick={upFormData} />
      </div>
    </div>
  );
};

export default connect(({ chatRoom, login }) => ({ principal: login.principal, ...chatRoom }))(UserLayout);
