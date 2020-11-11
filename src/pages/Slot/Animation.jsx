import { Card, Icon } from 'antd';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Motion, spring } from 'react-motion';
import { history } from 'umi';
import { timers } from '@/utils/GameCountdown';
const numberPosition = {
  '0': 1469,
  '1': 1395,
  '2': 1322,
  '3': 1249,
  '4': 1177,
  '5': 1104,
  '6': 1031,
  '7': 957,
  '8': 883,
  '9': 808,
}
const Animation = props => {
  const { wsData } = props;
  const [remainTime] = timers(wsData)
  //动画
  const [styleList, setStyleList] = useState([
    { backgroundPositionY: spring(732, { stiffness: 80, damping: 0 }) },
    { backgroundPositionY: spring(732, { stiffness: 80, damping: 0 }) },
    { backgroundPositionY: spring(732, { stiffness: 80, damping: 0 }) },
  ])
  useEffect(() => {
    console.log('remainTime:', remainTime);
  }, [remainTime])
  const onStarter = (num) => {
    if (remainTime > 0) {
      let arr = wsData.lastOpenResult.openCode.split(',')
      return { backgroundPositionY: spring(numberPosition[arr[num]], { stiffness: 80, damping: 100 }) }
    }
    if (remainTime == 0) {
      return { backgroundPositionY: spring(732, { stiffness: 80, damping: 0 }) }
    }
  }

  return (
    <div className={styles['animation']} style={{ width: '100%', height: 228 }}>
      <div style={{ position: 'relative', width: '100%', height: 228, overflow: 'hidden' }}>
        
        <div className={styles['animate-box']}>
          <div className={styles['animate-box-num']}>
            <div onClick={() => history.push('/user/gameLists')} style={{ position: 'absolute', top: 20, left: -5, width: 40, height: 40, zIndex: 10 }}>
              <img src={require('./img/back.png')} style={{ width: 40, height: 40 }} />
            </div>
            {/* BJ */}
            <div className={styles['animate-bj']} />
            {/* NUM */}
            <div className={styles['animate-num-border']} style={{ left: 37 }}>
              <Motion defaultStyle={{ backgroundPositionY: 0 }} style={onStarter(0)}>
                {
                  interpolatingStyle => <div className={styles['animate-num']} style={interpolatingStyle} />
                }
              </Motion>
            </div>

            <div className={styles['animate-num-border']} style={{ left: 118 }}>
              <Motion defaultStyle={{ backgroundPositionY: 0 }} style={onStarter(1)}>
                {
                  interpolatingStyle => <div className={styles['animate-num']} style={interpolatingStyle} />
                }
              </Motion>
            </div>

            <div className={styles['animate-num-border']} style={{ left: 197 }}>
              <Motion defaultStyle={{ backgroundPositionY: 0 }} style={onStarter(2)}>
                {
                  interpolatingStyle => <div className={styles['animate-num']} style={interpolatingStyle} />
                }
              </Motion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ chatRoom }) => ({ ...chatRoom }))(Animation);
