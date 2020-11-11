import { InputItem, Toast, List, Modal } from 'antd-mobile';
import { Input } from 'antd'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { history } from 'umi'
const Animation = props => {
    const { user, dispatch, issue, wsData, recordList } = props;
    const { lastOpenResult } = wsData;
    const [remainTime, setTime] = useState(3000);
    let openCode = lastOpenResult.openCode.split(",");
    useEffect(() => {
        if(remainTime === 0){
            dispatch({ type: 'chatRoom/getScene'})
        }
        let timer = setTimeout(() => {
            setTime(() => remainTime - 1000)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [remainTime])
    //动画
    return (
        <div style={{ width: '100%', height: 228 }}>
            <div className={styles.podiumbg} style={{ position: 'relative', width: '100%', height: 228, overflow: 'hidden' }}>
                <div className={styles.podiumItem}>
                    <img src={require('../../../images/rezult/result2.png')} width="80%" />
                    <img style={{ top: 1 }} src={require(`../../../images/rezult/winner${openCode[1]}.png`)} width="90%" />
                </div>
                <div className={styles.podiumItem}>
                    <img src={require('../../../images/rezult/result1.png')} width="80%" />
                    <img src={require(`../../../images/rezult/winner${openCode[0]}.png`)} width="90%" />
                </div>
                <div className={styles.podiumItem}>
                    <img src={require('../../../images/rezult/result3.png')} width="80%" />
                    <img src={require(`../../../images/rezult/winner${openCode[2]}.png`)} width="90%" />
                </div>
            </div>
        </div>
    );
};

export default connect(({ chatRoom }) => ({ ...chatRoom }))(Animation);
