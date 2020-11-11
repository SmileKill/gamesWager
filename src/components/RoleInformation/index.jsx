import { Flex, WhiteSpace } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Motion, spring, presets } from 'react-motion';
import styles from './index.less';
import { timers } from '@/utils/GameCountdown';
const Index = props => {
    const { principal, wsData } = props;
    //const [remainTime] = timer(wsData)
    const [remainTime] = timers(wsData)
    return (
        <div className={styles.header}>
            <div className={styles.text}>当前期号：<span>{wsData.lastOpenResult ? parseInt(wsData.lastOpenResult.openId) + 1 : 0}</span></div>
            <div className={styles.text}>在线人数:<span>1610</span></div>
            <div className={styles.text}>余额:<span>{principal.user.money}</span></div>
            <div className={styles.text}>封盘:<span style={{ color: 'red' }}>{remainTime}</span></div>
        </div>
    );
};

export default connect(({ login, chatRoom }) => ({
    ...login,...chatRoom
}))(Index);
