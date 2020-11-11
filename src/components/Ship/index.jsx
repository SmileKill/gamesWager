import { Flex, WhiteSpace } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Motion, spring, presets } from 'react-motion';
const Index = props => {
    const { top, speed } = props;
    return (
        <Motion defaultStyle={{ left: document.body.clientWidth }} style={{ left: spring(speed, { stiffness: 80, damping: 40 }) }}>
            {
                interpolatingStyle => {
                    return (
                        <div style={{ position: 'absolute', top: 70 + (top - 1) * 13.2, zIndex: 6, ...interpolatingStyle, transform: 'scale(0.35)' }}>
                            <div style={{ position: 'relative', width: '200px', height: '42px', verticalAlign: 'none' }}>
                                <img src={require(`./animate/yacht${top}.png`)} width="100%" style={{ width: 150, position: 'absolute', left: 0, top: 0 }} />
                                <div style={{ position: 'absolute', top: 25, right: 5, width: 60, zIndex: 7 }}><img src={require("./animate/flame.png")} width="100%" /></div>
                                <div style={{ position: 'absolute', top: 25, right: 5, width: 60, zIndex: 7 }}><img src={require("./animate/spray.png")} width="100%" /></div>
                            </div>
                        </div>
                    )
                }
            }
        </Motion>
    );
};

export default Index;
