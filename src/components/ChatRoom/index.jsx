import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import ChatItem from '@/components/ChatItem';

const UserLayout = props => {
    const { dispatch, principal, listRender, route } = props;
    const { randomKey } = principal;
    const [wsState, setState] = useState(null);
    useEffect(() => {
        const ws = new WebSocket(`ws://118.178.56.112:8080/ws/asset/${principal.user.id}_${route.type}/${randomKey}`);
        ws.onmessage = (msg) => {
            //JSON.parse()
            console.log('ws获取消息:', JSON.parse(msg.data))
            if (JSON.parse(msg.data).type == 1) {
                dispatch({ type: 'login/balance'})
                dispatch({ type: 'chatRoom/webSocketMsg', payload: { ...JSON.parse(msg.data), type: route.type == 3 ? 6 : 1 } })
                
            }
            if (JSON.parse(msg.data).type == 2) {
                 dispatch({ type: 'chatRoom/userdatalist', payload: { ...JSON.parse(msg.data), type: 2 } })
            }
            if (JSON.parse(msg.data).type == 3) {
                dispatch({ type: 'chatRoom/userMsg', payload: { data: JSON.parse(msg.data), type: 5 } })
            }
        };
        ws.onclose = (e) => {
            console.log('ws 连接关闭了');
            ws.onmessage = (msg) => {
                //JSON.parse()
                console.log('data:', JSON.parse(msg.data))
            };
        };
        ws.onerror = (msg) => {
            console.log('ws 报错');
            console.log('接收服务端报错', msg);
        }
        return () => {
            console.log('关闭WebSocket');
            ws.close()
            dispatch({ type: 'chatRoom/deletState'})
        }
    }, [wsState])
    //FormData 

    //投注记录
    const getRecent = () => {
        dispatch({
            type: 'chatRoom/getRecordList', params: {
                playType: route.type,
            }
        })
    }

    const getRecord = () => {
        dispatch({
            type: 'chatRoom/getRecentList', params: {
                playType: route.type,
            }
        })
    }

    const rule = () => {
        dispatch({
            type: 'chatRoom/getRrule', params: {
                playType: route.type,
            }
        })
    }

    const listRenderFuc = () => listRender.map((item, index) => <ChatItem key={index} value={item} />)
    return (
        <div className={styles.main} style={{ display: 'flex', flex: 1, paddingBottom: 44, overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: 40, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', marginRight: 5, marginLeft: 5, marginTop: 5, overflowY: 'auto' }}>
                <div onClick={getRecent} style={{ marginBottom: 5 }} >
                    <img src={require('@/../images/layouts/投注记录.png')} width="40px" height="40px" />
                </div>
                <div onClick={getRecord} style={{ marginBottom: 5 }}>
                    <img src={require('@/../images/layouts/往期结果.png')} width="40px" height="40px" />
                </div>
                <div onClick={rule} style={{ marginBottom: 5 }}>
                    <img src={require('@/../images/layouts/下注规则.png')} width="40px" height="40px" />
                </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}>
                {/* listStart  */}
                {listRenderFuc()}
            </div>
        </div>
    );
};

export default connect(({ chatRoom, login }) => ({ principal: login.principal, ...chatRoom }))(UserLayout);
