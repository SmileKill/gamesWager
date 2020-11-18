import React, { useState, useEffect } from 'react';
const clientWidth = document.body.clientWidth
let startGo
let startBG

const completionFunc = value => {
    if (String(value).length === 1) return `0${value}`
    return value
}
export const animationHooks = props => {
    const { remainTime } = props;
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
    //const [remainTime, setTime] = useState(countDown * 1000);
    const [greenState, getGreenState] = useState(false)
    const [yellowState, getYellowState] = useState(false)
    const [redState, getRedState] = useState(false)
    const baseBallList = [
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

    let BallList = baseBallList.sort((a, b) => a.number - b.number)
    const mint = parseInt(remainTime / (60 * 1000))
    const seco = parseInt((remainTime - (mint * 60 * 1000)) / 1000);
    const hm = parseInt((remainTime - (mint * 60 * 1000)) % 1000);
    return [
        car1Speed, car2Speed, car3Speed, car4Speed, car5Speed,
        car6Speed, car7Speed, car8Speed, car9Speed, car10Speed,
        bgSpeed, lineState, greenState, yellowState, redState,
        BallList, mint, seco, hm, remainTime
    ]
};


