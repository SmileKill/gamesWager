import React from 'react';
import styles from './index.less';
const Index = ({ value }) => {
    const { openCode, openId, predList, singOrDoubleList, sizeList, sum } = value;
    return (
        <div key={1} className={styles.LotteryResults}>
            <div style={{ display: 'flex' }} >
                <div style={{ color: '#ff8d27', fontSize: 14 }}>第{openId}期</div>
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>开奖</div>
                {openCode.split(",").map((item, index) => (
                    <div key={index} className={styles.openCode}>{item}</div>
                ))}
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>大小</div>
                {sizeList.map((item, index) => (
                    <div key={index} style={{ fontWeight: "bold", marginRight: 3, color: 'red' }}>{item}</div>
                ))}
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>单双</div>
                {singOrDoubleList.map((item, index) => (
                    <div key={index} style={{ fontWeight: "bold", marginRight: 3, color: 'blue' }}>{item}</div>
                ))}
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>龙虎</div>
                {predList.map((item, index) => (
                    <div key={index} style={{ fontWeight: "bold", marginRight: 3, color: 'red' }}>{item}</div>
                ))}
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>冠亚和</div><span style={{ color: 'blue' }}>{sum}</span>
            </div>
        </div>
    )
}

export default Index