import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Car from '@/components/Car';
import { history } from 'umi';
import { animationHooks } from '@/utils/animationHooks';

const completionFunc = value => {
    if (String(value).length === 1) return `0${value}`
    return value
}
const Animation = props => {
    const { wsData } = props;
    const { countDown } = wsData;
    const [car1Speed, car2Speed, car3Speed, car4Speed, car5Speed,
        car6Speed, car7Speed, car8Speed, car9Speed, car10Speed,
        bgSpeed, lineState, greenState, yellowState, redState,
        BallList, mint, seco, hm, remainTime] = animationHooks({
            remainTime: countDown * 1000
        })
    return (
        <div style={{ width: '100%', height: 228 }}>
            <div style={{ position: 'relative', width: '100%', height: 228, overflow: 'hidden' }}>
                <div className={styles.num}>
                    <div className={styles['num-left']}>
                        <ArrowLeftOutlined onClick={() => history.push('/user/gameLists')} color='#b8210b' />北京赛车
                        {/* <span>{issue.isBet ? '可下注' : '封盘'}</span> */}
                    </div>
                    <div className={styles['num-center']}>
                        <ul>
                            {BallList.map(item => (<li key={item.id} style={{ background: item.color, color: '#FFF' }}>{item.id}</li>))}
                        </ul>
                    </div>
                </div>
                <div className={styles.topbg} style={{ backgroundPosition: bgSpeed }} />
                <div className={styles['animate-box']} style={{ backgroundPosition: bgSpeed }}>
                    {
                        lineState ?
                            <div className={styles['line-1']} style={{ marginLeft: (document.body.clientWidth - 150) }}>
                                <img src={require('@/../images/animate/line.png')} width="100%" height="100%" />
                            </div> :
                            undefined
                    }
                </div>
                <Car top={1} speed={car1Speed} />
                <Car top={2} speed={car2Speed} />
                <Car top={3} speed={car3Speed} />
                <Car top={4} speed={car4Speed} />
                <Car top={5} speed={car5Speed} />
                <Car top={6} speed={car6Speed} />
                <Car top={7} speed={car7Speed} />
                <Car top={8} speed={car8Speed} />
                <Car top={9} speed={car9Speed} />
                <Car top={10} speed={car10Speed} />
                {
                    remainTime > 0 ?
                        <div className={styles.light}>
                            <div className={styles.countdownnum}>{completionFunc(mint)}:{completionFunc(seco)}:{completionFunc(hm)}</div>
                            <div style={{ display: greenState ? 'block' : 'none' }} className={styles.lightgreen}><img src={require("@/../images/animate/lightgreen.png")} width="100%" /></div>
                            <div style={{ display: yellowState ? 'block' : 'none' }} className={styles.lightyellow}><img src={require("@/../images/animate/lightyellow.png")} width="100%" /></div>
                            <div style={{ display: redState ? 'block' : 'none' }} className={styles.lightred}><img src={require("@/../images/animate/lightred.png")} width="100%" /></div>
                        </div>
                        : undefined
                }
            </div>
        </div>
    );
};

export default connect(({ chatRoom }) => ({ ...chatRoom }))(Animation);
