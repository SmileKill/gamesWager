import React, { useState } from 'react';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import { connect } from 'dva';
import RoleInformation from '@/components/RoleInformation';
//import Animation from './Animation';
import InputKeyBoard from '@/components/InputKeyBoard';
import ChatRoom from '@/components/ChatRoom';
import styles from './index.less';
import { history } from 'umi'
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

  //const sceneFuc = () => <Animation />
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={styles.num}>
        <div className={styles['num-left']}>
          <ArrowLeftOutlined onClick={() => history.push('/user/gameLists')} color='#b8210b' />
                六合彩
                    </div>
      </div>
      <div className={styles['animation']} style={{ width: '100%', height: 228 }}>
        {wsData.lastOpenResult?wsData.lastOpenResult.openCode.split(",").map((item) => (
          <div className={styles['redItem']}>
            {item}
          </div>
        )):null}
        {
          wsData.lastOpenResult?<div className={styles['blueItem']}>
          {wsData.lastOpenResult.specialCode}
        </div>:null
        }
      </div>
      <RoleInformation />
      <ChatRoom route={route} />
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <InputKeyBoard keyState={'lottery'} onChange={(res) => setValue(res)} value={value} onClick={upFormData} />
      </div>
    </div>
  );
};

export default connect(({ chatRoom, login }) => ({ principal: login.principal, ...chatRoom }))(UserLayout);
