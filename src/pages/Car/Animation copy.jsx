import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Car from '@/components/Car';
import { history } from 'umi'
const clientWidth = document.body.clientWidth
let startGo
let startBG

const completionFunc = value => {
    if (String(value).length === 1) return `0${value}`
    return value
}
const Animation = props => {
    const { wsData } = props;
    const { countDown } = wsData;
    //动画
    const [car1Speed, setcar1Speed] = useState(clientWidth - 110);
    const [car2Speed, setcar2Speed] = useState(clientWidth - 120);
    const [car3Speed, setcar3Speed] = useState(clientWidth - 130);
    const [car4Speed, setcar4Speed] = useState(clientWidth - 140);
    const [car5Speed, setcar5Speed] = useState(clientWidth - 150);
    const [car6Speed, setcar6Speed] = useState(clientWidth - 160);
    const [car7Speed, setcar7Speed] = useState(clientWidth - 170);
    const [car8Speed, setcar8Speed] = useState(clientWidth - 180);
    const [car9Speed, setcar9Speed] = useState(clientWidth - 190);
    const [car10Speed, setcar10Speed] = useState(clientWidth - 200);
    const [bgSpeed, setBgSpeed] = useState(0);
    const [lineState, setLineState] = useState(1);
    const [remainTime, setTime] = useState(countDown * 1000);
    const [greenState, getGreenState] = useState(false)
    const [yellowState, getYellowState] = useState(false)
    const [redState, getRedState] = useState(false)
    const BallList = [
        {
            id: 1,
            number: car1Speed,
            color: '#f7d919'
        }, {
            id: 2,
            number: car2Speed,
            color: '#48b6ea'
        }, {
            id: 3,
            number: car3Speed,
            color: '#f7d919'
        }, {
            id: 4,
            number: car4Speed,
            color: '#f08b1c'
        }, {
            id: 5,
            number: car5Speed,
            color: '#4bf2b6'
        }, {
            id: 6,
            number: car6Speed,
            color: '#5963d0'
        }, {
            id: 7,
            number: car7Speed,
            color: '#7d8183'
        }, {
            id: 8,
            number: car8Speed,
            color: '#fe949e'
        }, {
            id: 9,
            number: car9Speed,
            color: '#e84f58'
        }, {
            id: 10,
            number: car10Speed,
            color: '#3ad830'
        }
    ]
    useEffect(() => {
        let timer = ""
        if (remainTime > 0) {
            timer = setTimeout(() => {
                setTime(() => remainTime - 10)
            }, 10)
        }
        if (remainTime === 0) {
            setTimeout(() => start(), 1000)
        }
        //灯光
        if (remainTime < 3000) {
            getRedState(true)
        }
        if (remainTime < 2000) {
            getYellowState(true)
        }
        if (remainTime < 1000) {
            getGreenState(true)
        }
        return () => {
            clearInterval(timer)
        }
    }, [remainTime])
    
    const timer = () => setInterval(() => {
        setcar1Speed(Math.random() * clientWidth)
        setcar2Speed(Math.random() * clientWidth)
        setcar3Speed(Math.random() * clientWidth)
        setcar4Speed(Math.random() * clientWidth)
        setcar5Speed(Math.random() * clientWidth)
        setcar6Speed(Math.random() * clientWidth)
        setcar7Speed(Math.random() * clientWidth)
        setcar8Speed(Math.random() * clientWidth)
        setcar9Speed(Math.random() * clientWidth)
        setcar10Speed(Math.random() * clientWidth)
    }, 500)

    const timer2 = () => setInterval(() => {
        setBgSpeed(c => c + 10)
    }, 10)

    const start = () => {
        clearInterval(startGo);
        clearInterval(startBG);
        startGo = timer()
        startBG = timer2()
        setLineState(0)
    }


    const mint = parseInt(remainTime / (60 * 1000))
    const seco = parseInt((remainTime - (mint * 60 * 1000)) / 1000);
    const hm = parseInt((remainTime - (mint * 60 * 1000)) % 1000);
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
                            {BallList.
                                sort((a, b) => a.number - b.number).
                                map(item => (<li key={item.id} style={{ background: item.color, color: '#FFF' }}>{item.id}</li>))}
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
