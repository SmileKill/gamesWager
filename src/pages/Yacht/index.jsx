import { Card } from 'antd'
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import RoleInformation from '@/components/RoleInformation';
import ChatItem from '@/components/ChatItem';
import Animation from './Animation';
import Podium from './Podium';
import InputKeyBoard from '@/components/InputKeyBoard';
import ChatRoom from '@/components/ChatRoom';
const UserLayout = props => {
  const { dispatch, issue, principal, wsData, scene, listRender, route } = props;
  const { randomKey, user } = principal;
  const [wsState, setState] = useState(null);
  const [value, setValue] = useState("");
  
  const upFormData = (event) => {
    dispatch({ type: 'login/upFormData', params: value })
    event.stopPropagation()
  }

  //投注记录

  const sceneFuc = () => {
    switch (scene) {
      case 0: return undefined;
      case 1: return <Animation/>;
      case 2: return <Podium />;
    }
  }

  const listRenderFuc = () => listRender.map(item => <ChatItem value={item} />)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {sceneFuc()}
      <RoleInformation wsData={wsData} />
      <ChatRoom route={route} />
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <InputKeyBoard onChange={(res) => setValue(res)} value={value} onClick={upFormData} />
      </div>
    </div>
  );
};

export default connect(({ chatRoom, login }) => ({ principal: login.principal, ...chatRoom }))(UserLayout);
