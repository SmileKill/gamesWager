import React from 'react';
import styles from './index.less';
const Index = ({ value }) => {
    const { winMoney, tradeCode, tradeId } = value;
    return (
        <div key={1} className={styles.LotteryResults}>
            <div style={{ display: 'flex' }} >
                <div style={{ color: '#ff8d27', fontSize: 14 }}>第{tradeId}期</div>
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>投注内容:</div><span style={{ color: 'blue' }}>{tradeCode}</span>
            </div>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>收益:</div><span style={{ color: 'blue' }}>{winMoney}</span>
            </div>
        </div>
    )
}

export default Index