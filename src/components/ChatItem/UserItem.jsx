import React from 'react';
import styles from './index.less';
const Index = ({ value }) => {
    const { tradeCode, userName } = value;
    return (
        <div key={1} className={styles.userChat}>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>{userName}:</div>
                <div style={{ marginLeft: 3 }}>{tradeCode}</div>
            </div>
        </div>
    )
}

export default Index