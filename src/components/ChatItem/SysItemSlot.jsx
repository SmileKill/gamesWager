import React from 'react';
import styles from './index.less';
const Index = ({ value }) => {
    const { openCode, openId, sumSingOrDouble, singOrDouble, sumSize, otherResult } = value;
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
                <div style={{ fontWeight: "bold", marginRight: 3 }}>大小:</div>
                <div style={{ fontWeight: "bold", marginRight: 3, color: 'red' }}>{sumSize}</div>
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>单双:</div>
                <div style={{ fontWeight: "bold", marginRight: 3, color: 'blue' }}>{singOrDouble}</div>
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>大小单双:</div>
                <div style={{ fontWeight: "bold", marginRight: 3, color: 'red' }}>{sumSingOrDouble}</div>
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>其他结果:</div><span style={{ color: 'blue' }}>{otherResult}</span>
            </div>
        </div>
    )
}

export default Index