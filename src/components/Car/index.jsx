import { Flex, WhiteSpace } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Motion, spring, presets } from 'react-motion';
const Index = props => {
    const { top, speed } = props;
    const [left, setLeft] = useState(0);
    return (
        <Motion defaultStyle={{ left: document.body.clientWidth }} style={{ left: spring(speed, { stiffness: 80, damping: 40 }) }}>
            {
                interpolatingStyle => {
                    return (
                        <div style={{ position: 'absolute', top: 70 + (top - 1) * 13.2, zIndex: 6, ...interpolatingStyle, transform: 'scale(0.35)' }}>
                            <div style={{ position: 'relative', width: '200px', height: '42px', verticalAlign: 'none' }}>
                                <img src={require(`./images/animate/car${top}.png`)} width="100%" style={{ width: 150, position: 'absolute', left: 0, top: 0 }} />
                                <div style={{ position: 'absolute', top: '19px', left: '25px', width: '20px' }}><img src={require("./images/animate/wheel.gif")} width="100%" /></div>
                                <div style={{ position: 'absolute', top: 19, right: 64, width: 20 }}><img src={require("./images/animate/wheel.gif")} width="100%" /></div>
                                <div style={{ position: 'absolute', top: -10, left: -20, width: 150, zIndex: 7 }}><img src={require("./images/animate/wind.png")} width="100%" /></div>
                                <div style={{ position: 'absolute', top: 25, right: 5, width: 60, zIndex: 7 }}><img src={require("./images/animate/flame.png")} width="100%" /></div>
                            </div>
                        </div>
                    )
                }
            }
        </Motion>
    );
};

export default Index;
