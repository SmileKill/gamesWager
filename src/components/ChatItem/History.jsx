import React from 'react';
import styles from './index.less';
const History = ({ value }) => {
    const { openCode, openId, } = value;
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
        </div>
    )
}

export default History